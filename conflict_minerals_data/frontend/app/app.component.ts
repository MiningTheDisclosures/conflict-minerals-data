import { 
  Component 
} from '@angular/core';

import { 
  CompaniesService 
} from './services/companies';

@Component({
  selector: 'my-app',
  template: `
  <header>Conflict Minerals Data</header>
  <main></main>
  `,
  providers: [CompaniesService]
})
export 
class AppComponent { 
 
  constructor(private companiesService: CompaniesService) { }
  companies: any[]
 
  getCompanies(): void {
    this.companiesService.getCompanies().then(companies => this.companies = companies);
  }
 
  ngOnInit(): void {
    this.getCompanies();
  }
 
}
