import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IFiling, IFilingResponse } from '../models';
export declare class FilingsService {
    private http;
    filings: IFiling[];
    constructor(http: Http);
    getResponse(url: string, params: {}): Observable<IFilingResponse>;
    getFilings(url?: string, params?: {}): void;
}
