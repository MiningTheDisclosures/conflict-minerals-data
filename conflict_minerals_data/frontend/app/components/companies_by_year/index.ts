import { Component } from '@angular/core';

import { 
  CompaniesService 
} from '../../services/companies';

@Component({
  template: `
  <ul>
    <li *ngFor="let company of companies">
      {{ company.cik }} - {{ company.conformed_name }}
    </li>
  </ul>
  `,
  providers: [CompaniesService]

})
export 
class CompaniesByYear { 
  constructor(private companiesService: CompaniesService) { }
  companies: any[]
 
  getCompanies(): void {
    this.companiesService.getCompanies()
      .then((success) => {
        this.companies = success.results as any[];
      })
      .catch((error) => {
        console.error(error);
      })
  }
 
  ngOnInit(): void {
    this.getCompanies();
  }
 
}