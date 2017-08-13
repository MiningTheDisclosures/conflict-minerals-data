import { 
  enableProdMode,
  NgModule
} from '@angular/core';

import { 
  HttpModule 
} from '@angular/http';

import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
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
  DocumentsByYear,
  Home
} from './components';

import {
  Globals
} from './globals';

const appRoutes: Routes = [
   { path: 'companies-by-year/:year', component: DocumentsByYear },
   { path: '', component: Home },
]

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@NgModule({
  bootstrap: [ 
    AppComponent 
  ],
  declarations: [ 
    AppComponent,
    DocumentsByYear,
    Home,
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // Material components
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdTableModule,
    MdToolbarModule,
  ],
  providers: [ 
    Globals 
  ],
})
export 
class AppModule { }
