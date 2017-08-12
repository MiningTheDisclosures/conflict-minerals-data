import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ICompany, ICompanyResponse } from '../models';
export declare class CompaniesService {
    private http;
    companies: ICompany[];
    constructor(http: Http);
    getResponse(url: string): Observable<ICompanyResponse>;
    getCompanies(url?: string): void;
}
