import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { CompanyResponse } from '../models';
export declare class CompaniesService {
    private http;
    constructor(http: Http);
    getCompanies(url: string): Observable<CompanyResponse>;
}
