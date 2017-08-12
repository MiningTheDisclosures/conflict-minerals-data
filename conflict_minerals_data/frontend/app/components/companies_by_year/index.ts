import { 
  Component 
} from '@angular/core';

import { 
  CompaniesService 
} from '../../services/companies';

import {
  Company
} from '../../models';

@Component({
  template: `
  <ol>
    <li *ngFor="let company of companies">
      {{ company.cik }} - {{ company.conformed_name }}
    </li>
  </ol>
  `,
  providers: [CompaniesService]

})
export 
class CompaniesByYear { 
 
  constructor(private companiesService: CompaniesService) { }

  get companies(): Company[] {
    return this.companiesService.companies;
  }
  ngOnInit(): void {
    this.companiesService.getCompanies();
  }
 
}