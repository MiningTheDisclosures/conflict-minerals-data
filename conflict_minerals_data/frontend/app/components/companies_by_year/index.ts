import { 
  Component 
} from '@angular/core';

import { 
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  Subscription
} from 'rxjs/Subscription';

import { 
  CompaniesService 
} from '../../services/companies';

import {
  FilingsService
} from '../../services/filings';

import {
  ICompany,
  IFiling
} from '../../models';

@Component({
  template: `
  <ol>
    <li *ngFor="let filing of filings">
      {{ filing.company }} - <a href="{{ filing.link }}">{{ filing.date }}</a>
    </li>
  </ol>
  <ol>
    <li *ngFor="let company of companies">
      {{ company.cik }} - {{ company.conformed_name }}
    </li>
  </ol>
  `,
  providers: [
    CompaniesService, 
    FilingsService
  ]

})
export 
class CompaniesByYear { 
  year: Subscription;
  route: ActivatedRoute;
 
  constructor(
    private activatedRoute: ActivatedRoute,
    private companiesService: CompaniesService,
    private filingsService: FilingsService,
  ) { }

  get companies(): ICompany[] {
    return this.companiesService.companies;
  }
  get filings(): IFiling[] {
    return this.filingsService.filings;
  }
  
  ngOnInit(): void {
    this.companiesService.getCompanies();
    // Get filings for a particular year on route change
    this.activatedRoute.params.subscribe((params: Params) => {
      this.filingsService.getResults(params);
    });
  }
 
}