import { 
  enableProdMode,
  NgModule
} from '@angular/core';

import { 
  HttpModule 
} from '@angular/http';

import {
  MdTableModule,
  MdToolbarModule,
} from '@angular/material';

import { 
  BrowserModule 
} from '@angular/platform-browser';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';

import { 
  RouterModule, 
  Routes
} from '@angular/router';

import { 
  AppComponent 
} from './app.component';

import { 
  DocumentsByYear
} from './components/documents_by_year';

const appRoutes: Routes = [
   { path: 'companies-by-year/:year', component: DocumentsByYear },
]

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@NgModule({
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MdTableModule,
    MdToolbarModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
    AppComponent,
    DocumentsByYear
  ],
  bootstrap: [ 
    AppComponent 
  ],
})
export 
class AppModule { }
