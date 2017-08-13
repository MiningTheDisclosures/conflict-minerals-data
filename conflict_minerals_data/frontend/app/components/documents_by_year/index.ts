import { 
  Component 
} from '@angular/core';

import { 
  ActivatedRoute,
  Params
} from '@angular/router';

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
  template: `
  <ul>
    <li *ngFor="let filing of filings">
      {{ filing.company.conformed_name | titlecase }} - <a href="{{ filing.link }}">{{ filing.date | date:'MM-dd-yyyy'}}</a>
      <div *ngFor="let doc of filing.documents">
        {{ doc.doc_type }}
      </div>
    </li>
  </ul>
  `,
  providers: [
    CompaniesService, 
    DocumentsService,
    FilingsService
  ]

})
export 
class DocumentsByYear { 
  year: number;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    private documentsService: DocumentsService,
    private filingsService: FilingsService,
  ) { }

  get companies(): Map<number, ICompany> { return this.companiesService.companies; }
  get documents(): IDocument[] { return this.documentsService.documents; }
  get filings(): IFiling[] {
    // Get the filings for the active year
    return this.filingsService.filings.filter(
      (item, i, all) => {
        return item.date.getFullYear() == this.year;
      }
    )
    // Add the company on
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
    // Sort by the company name
    .sort(
      (a, b) => {
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
    );
  }

  ngOnInit(): void {
    this.companiesService.getResults({});
    // Get filings for a particular year on route change
    this.activatedRoute.params.subscribe((params: Params) => {
      this.year = parseInt(params.year);
      this.filingsService.getResults(params);
      this.documentsService.getResults(params);
    });
  }
}
