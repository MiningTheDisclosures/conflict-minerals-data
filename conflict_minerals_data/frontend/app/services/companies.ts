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
  ICompany,
  ICompanyResponse
} from '../models';

@Injectable()
export class CompaniesService {
  companies: ICompany[] = [];
  constructor(private http: Http) { 
  }

  getResponse(url: string): Observable<ICompanyResponse> {
    return this.http
      .get(url)
      .map((response: Response) => {
        return (response.json() as ICompanyResponse);
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
