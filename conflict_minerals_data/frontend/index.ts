import 'zone.js';
import 'reflect-metadata';

import { 
  enableProdMode 
} from '@angular/core';
import { 
  platformBrowserDynamic 
} from '@angular/platform-browser-dynamic';

import { 
  AppModule 
} from './app/app.module';

// Enable production mode unless running locally
if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
