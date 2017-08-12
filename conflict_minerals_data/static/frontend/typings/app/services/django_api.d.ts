import { Http } from '@angular/http';
import { Params } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export declare class DjangoAPIService {
    private http;
    retrieved: Params[];
    url: string;
    constructor(http: Http);
    protected initialize(): void;
    protected processResults(results: any[]): void;
    getResults(params: Params): void;
    private getResponse(url, params);
    private getParamsFromUrl(url);
}
