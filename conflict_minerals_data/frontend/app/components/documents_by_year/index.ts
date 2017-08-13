import {
  DataSource
} from '@angular/cdk';

import { 
  Component 
} from '@angular/core';

import { 
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  BehaviorSubject
} from 'rxjs/BehaviorSubject';

import {
  Observable
} from 'rxjs/Observable';

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
  templateUrl: './index.html',
  providers: [
    CompaniesService, 
    DocumentsService,
    FilingsService
  ]

})
export
class DocumentsByYear {
  displayedColumns = ['companyName', 'filingLink', 'filingDate']; //, 'docType', 'docLink'];
  data: DocumentsData  
  dataSource: DocumentsSource | null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    private documentsService: DocumentsService,
    private filingsService: FilingsService,
  ) { 
    this.data = new DocumentsData(this.companiesService, this.documentsService, this.filingsService);
  }

  ngOnInit() {
    this.dataSource = new DocumentsSource(this.data);
    this.companiesService.getResults({});
    this.activatedRoute.params.subscribe((params: Params) => {
      this.data.year = parseFloat(params.year);
      this.filingsService.getResults(params);
      this.documentsService.getResults(params);
    });
  }
}

export
class DocumentsData { 
  year: number;
  dataChange: BehaviorSubject<IFiling[]> = new BehaviorSubject<IFiling[]>([]);
 
  constructor(
    private companiesService: CompaniesService,
    private documentsService: DocumentsService,
    private filingsService: FilingsService,
  ) { 
    this.companiesService.dataChange.subscribe(() => this.processFilings());
    this.filingsService.dataChange.subscribe(() => this.processFilings());
    this.documentsService.dataChange.subscribe(() => this.processFilings());
  }

  get companies(): Map<number, ICompany> { return this.companiesService.companies; }
  get documents(): IDocument[] { return this.documentsService.documents; }

  private processFilings(): void {
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
    // Sort by the company name
    // .sort(
    //   (a, b) => {
    //     let compA = a.company && a.company.conformed_name ? a.company.conformed_name : 'Undefined';
    //     let compB = b.company && b.company.conformed_name ? b.company.conformed_name : 'Undefined';
    //     compA.toUpperCase();
    //     compB.toUpperCase();

    //     let comparison = 0;
    //     if (compA > compB) {
    //       comparison = 1;
    //     } else if (compA < compB) {
    //       comparison = -1;
    //     }
    //     return comparison;
    //   }
    // );
  }

  set params(value: Params) {
  }
}


export class DocumentsSource extends DataSource<any> {
  constructor(private _data: DocumentsData) {
    super();
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<IFiling[]> {
    return this._data.dataChange;
  }
  disconnect() {}
}