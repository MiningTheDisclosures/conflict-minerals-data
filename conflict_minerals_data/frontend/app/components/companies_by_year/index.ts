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
  companies: Company[] = [];
 
  constructor(private companiesService: CompaniesService) { }

  // Seems like a mix of logic between service and component

  getCompanies(url: string): void {
    this.companiesService.getCompanies(url)
      .subscribe(
        (data) => { 
          this.companies = this.companies.concat(data.results);
          if ( data.next ) {
            this.getCompanies(data.next);
          }
        },
        (error) => console.error("Error: ", error)
      )
  }
 
  ngOnInit(): void {
    this.getCompanies('/api/companies/');
  }
 
}