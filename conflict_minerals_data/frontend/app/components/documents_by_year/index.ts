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
  <ol>
    <li *ngFor="let filing of filings">
      {{ filing.company.conformed_name }} - <a href="{{ filing.link }}">{{ filing.date }}</a>
    </li>
  </ol>
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
    let activeFilings = this.filingsService.filings.filter(
      (item, i, all) => {
        return item.date.getFullYear() == this.year;
      }
    );
    // Add the company on
    activeFilings.map(
      (item, i, all) => {
        item.company = this.companies.get(item.company_id) || new Company({});
      }
    )
    return activeFilings;
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