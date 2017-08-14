import {
  CdkTableModule
} from '@angular/cdk';

import { 
  enableProdMode,
  NgModule
} from '@angular/core';

import { 
  FormsModule 
} from '@angular/forms';

import { 
  HttpModule 
} from '@angular/http';

import {
  MdButtonModule,
  MdCardModule,
  MdIconModule,
  MdInputModule,
  MdSelectModule,
  MdSortModule,
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
   { path: 'documents-by-year', component: DocumentsByYear },
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
    FormsModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // Material components
    CdkTableModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdSelectModule,
    MdSortModule,
    MdTableModule,
    MdToolbarModule,
  ],
  providers: [ 
    Globals 
  ],
})
export 
class AppModule { }
