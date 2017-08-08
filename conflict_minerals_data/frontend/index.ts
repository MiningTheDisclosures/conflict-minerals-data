import 'zone.js';
import 'reflect-metadata';

import { 
    platformBrowserDynamic 
} from '@angular/platform-browser-dynamic';

import { 
    AppModule 
} from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

import { enableProdMode } from '@angular/core';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}