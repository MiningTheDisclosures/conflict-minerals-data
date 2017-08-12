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
  Company,
  CompanyResponse
} from '../models';

@Injectable()
export class CompaniesService {
  companies: Company[] = [];
  constructor(private http: Http) { 
  }

  getResponse(url: string): Observable<CompanyResponse> {
    return this.http
      .get(url)
      .map((response: Response) => {
        return (response.json() as CompanyResponse);
      })
  }

  getCompanies(url?: string) {
    if (!url) {
      url = '/api/companies';
    }
    this.getResponse(url).subscribe(
      (data) => {
        this.companies = this.companies.concat(data.results);
        if ( data.next ) {
          return this.getCompanies(data.next);
        }
      }
    )
  }

}
