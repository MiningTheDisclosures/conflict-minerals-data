import {
  DataSource
} from '@angular/cdk';

import { 
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  MdSort
} from '@angular/material';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

import { Globals } from '../../globals';

import {
  CompaniesService,
  DocumentsService,
  FilingsService,
} from '../../services';

import {
  Company,
  ICompany,
  IDocument,
  IFiling,
} from '../../models';

@Component({
  templateUrl: 'index.html',
  styleUrls: ['index.css', ],
  providers: [
    CompaniesService, 
    DocumentsService,
    FilingsService
  ]

})
export
class DocumentsByYear {
  displayedColumns = ['companyName', 'filingLink', 'filingDate', 'documents'];
  data: DocumentsData  
  dataSource: DocumentsSource | null;

  @ViewChild(MdSort) sort: MdSort;
  @ViewChild('filter') filter: ElementRef;

  constructor(
    private companiesService: CompaniesService,
    private documentsService: DocumentsService,
    private filingsService: FilingsService,
    private globals: Globals
  ) { 
    this.data = new DocumentsData(this.companiesService, this.documentsService, this.filingsService);
  }

  get years() { return this.globals.YEARS }

  ngOnInit() {
    this.dataSource = new DocumentsSource(this.data, this.sort);
    this.companiesService.getResults({});
    this.data.year = 2017;
    this.data.filter = this.filter;

    // Add filtering
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) { return; }
        this.data.filterTableData(this.filter.nativeElement.value);
      });
  }
}

export
class DocumentsData { 
  _year: number;
  filter: ElementRef;
  dataChange: BehaviorSubject<IFiling[]> = new BehaviorSubject<IFiling[]>([]);
 
  constructor(
    private companiesService: CompaniesService,
    private documentsService: DocumentsService,
    private filingsService: FilingsService,
  ) { 
    this.companiesService.dataChange.subscribe(() => this.buildTableData());
    this.filingsService.dataChange.subscribe(() => this.buildTableData());
    this.documentsService.dataChange.subscribe(() => this.buildTableData());
  }

  get companies(): Map<number, ICompany> { return this.companiesService.companies; }
  get documents(): IDocument[] { return this.documentsService.documents; }
  get year(): number { return this._year; }
  set year(value: number) {
    this._year = value;
    this.filingsService.getResults({year: value});
    this.documentsService.getResults({year: value});
    if ( this.filter ) {
      // Empty filter to avoid confusion
      this.filter.nativeElement.value = '';
    }
    this.buildTableData();
  }

  filterTableData(query: string): void {
    let filteredFilings = this.filingsService.filings.filter(
      (item, i, all) => {
        let queryString = query.toLowerCase();
        let searchString: string = ''
        let match: number = null;

        // Search on company name
        searchString = item.company.conformed_name.toLowerCase();
        match = searchString.search(queryString);
        if ( match != -1 ) { return true }

        // Search on document type
        searchString = item.documents
          .map((a) => a.description )
          .reduce((prev, curr) => prev + curr, '' )
          .toLowerCase();
        match = searchString.search(queryString);
        if ( match != -1 ) { return true }
      }
    )
    this.dataChange.next(filteredFilings);
  }

  private buildTableData(): void {
    // Get the filings for the active year
    let processedFilings = this.filingsService.filings.filter(
      (item, i, all) => {
        return item.date.getFullYear() == this.year;
      }
    )
    // Add the company and documents on
    .map(
      (filing, i, all) => {
        filing.company = this.companies.get(filing.company_id) || new Company({});
        filing.documents = this.documents.filter(
          (document, i, all) => {
            return document.filing_id == filing.id
          }) || [];
        return filing;
      }
    )
    this.dataChange.next(processedFilings);
  }
}


export class DocumentsSource extends DataSource<any> {
  constructor(
    private _data: DocumentsData,
    private _sort: MdSort 
  ) {
    super();
  }
  
  connect(): Observable<IFiling[]> {
    return Observable.merge(this._data.dataChange, this._sort.mdSortChange).map(
      () => { return this.getSortedData(); }
    );
  }

  disconnect() {}

  private getSortedData(): IFiling[] {
    const data = this._data.dataChange.value.slice();
    if (!this._sort.active || this._sort.direction == '') { 
      // Sort by companyName by default
      return data.sort(this.compareCompanyName);
    }
    if (this._sort.active == 'companyName') {
      return data.sort(this.compareCompanyName);
    }
    return data.sort((a, b) => {
      let propertyA: number|string|Date = '';
      let propertyB: number|string|Date = '';

      switch (this._sort.active) {
        case 'filingDate': [propertyA, propertyB] = [a.date, b.date]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
  
  private compareCompanyName(a: IFiling, b: IFiling) {
    let compA = a.company && a.company.conformed_name ? a.company.conformed_name : 'Undefined';
    let compB = b.company && b.company.conformed_name ? b.company.conformed_name : 'Undefined';
    compA.toUpperCase();
    compB.toUpperCase();

    let comparison = 0;
    if (compA > compB) {
      comparison = 1;
    } else if (compA < compB) {
      comparison = -1;
    }
    return comparison;
  }
}
