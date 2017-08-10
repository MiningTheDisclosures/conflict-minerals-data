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
  CompanyResponse
} from '../models';

@Injectable()
export class CompaniesService {
  constructor(private http: Http) { 
  }

  getCompanies(url: string): Observable<CompanyResponse> {
    return this.http
      .get(url)
      .map((response: Response) => {
        return (response.json() as CompanyResponse);
      })
  }

}
