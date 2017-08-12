import { 
  Injectable 
} from '@angular/core';

import { 
  Http,
  Response
} from '@angular/http';

import {
  Params
} from '@angular/router';

import { 
  Observable
} from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {
  IDjangoAPIResponse
} from '../models';

@Injectable()
export 
class DjangoAPIService {
  retrieved: Params[] = [];
  url: string;

  constructor(
    private http: Http
  ) { 
    this.initialize();
  }

  protected initialize() {
    // setup URL in SubClass
  }

  protected processResults(results: any[]): void {
    // SubClass should save results here
  }

  getResults(params: Params) {
    let existingGets = this.retrieved.filter(
      (item, i, array) => {
        return item.page == params.page && item.year == params.year;  
      }
    )
    if ( existingGets.length > 0 ) {
      // Don't get something we already got
      return;
    }
    this.retrieved.push(params)
    this.getResponse(this.url, params).subscribe(
      (data) => {
        this.processResults(data.results);
        if ( data.next ) {
          let nextParams = this.getParamsFromUrl(data.next)
          this.getResults(nextParams);
        }
      }
    )
  }

  private getResponse(url: string, params: {}): Observable<IDjangoAPIResponse> {
    return this.http
      .get(url, {
        params: params
      })
      .map((response: Response) => {
        return (response.json() as IDjangoAPIResponse);
      })
  }

  private getParamsFromUrl(url: string): Params {
    let paramString = url.split('?')[1];
    // Stack overflow copy-paste
    // https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object
    let paramObject = JSON.parse(
      '{"' + decodeURI(paramString.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}'
    )
    return paramObject as Params;
  }

}
