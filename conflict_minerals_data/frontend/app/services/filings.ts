import { 
  Injectable 
} from '@angular/core';

import { 
  Http,
  Response
} from '@angular/http';

import { 
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  Filing,
  FilingResponse
} from '../models';

@Injectable()
export class FilingsService {
  filings: Filing[] = [];
  constructor(private http: Http) { 
  }

  getResponse(url: string): Observable<FilingResponse> {
    return this.http
      .get(url)
      .map((response: Response) => {
        return (response.json() as FilingResponse);
      })
  }

  getCompanies(url?: string) {
    if (!url) {
      url = '/api/filings';
    }
    this.getResponse(url).subscribe(
      (data) => {
        this.filings = this.filings.concat(data.results);
        if ( data.next ) {
          return this.getCompanies(data.next);
        }
      }
    )
  }

}
