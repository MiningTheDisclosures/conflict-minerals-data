import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Company, CompanyResponse } from '../models';
export declare class CompaniesService {
    private http;
    companies: Company[];
    constructor(http: Http);
    getResponse(url: string): Observable<CompanyResponse>;
    getCompanies(url?: string): void;
}
