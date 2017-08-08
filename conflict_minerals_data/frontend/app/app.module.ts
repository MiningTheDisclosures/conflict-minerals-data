import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { 
  AppComponent 
} from './app.component';
import { 
  CompaniesByYear
} from './components/companies_by_year';

const appRoutes: Routes = [
   { path: 'companies-by-year/:year', component: CompaniesByYear },
]

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  declarations: [ 
    AppComponent,
    CompaniesByYear,
  ],
  bootstrap: [ 
    AppComponent 
  ]
})
export 
class AppModule { }
