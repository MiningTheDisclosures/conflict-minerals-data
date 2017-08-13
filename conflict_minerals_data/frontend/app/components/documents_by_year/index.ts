import { 
  Component 
} from '@angular/core';

import { 
  ActivatedRoute,
  Params
} from '@angular/router';

import { 
  CompaniesService 
} from '../../services/companies';

import {
  FilingsService
} from '../../services/filings';

import {
  Company,
  ICompany,
  IFiling,
} from '../../models';

@Component({
  template: `
  <ul>
    <li *ngFor="let filing of filings">
      {{ filing.company.conformed_name | titlecase }} - <a href="{{ filing.link }}">{{ filing.date | date:'MM-dd-yyyy'}}</a>
    </li>
  </ul>
  `,
  providers: [
    CompaniesService, 
    FilingsService
  ]

})
export 
class DocumentsByYear { 
  year: number;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    private filingsService: FilingsService,
  ) { }

  get companies(): Map<number, ICompany> {
    return this.companiesService.companies;
  }
  get filings(): IFiling[] {
    // Get the filings for the active year
    return this.filingsService.filings.filter(
      (item, i, all) => {
        return item.date.getFullYear() == this.year;
      }
    )
    // Add the company on
    .map(
      (item, i, all) => {
        item.company = this.companies.get(item.company_id) || new Company({});
        return item;
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
    });
  }

  ngOnChanges(): void {
    console.log('changed');
  }
 
}