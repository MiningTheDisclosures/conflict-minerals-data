import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { Params } from '@angular/router';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
export declare class DjangoAPIService {
    private http;
    dataChange: BehaviorSubject<number>;
    retrieved: Params[];
    url: string;
    constructor(http: Http);
    protected initialize(): void;
    protected processResults(results: any[]): void;
    getResults(params: Params): void;
    private getResponse;
    private getParamsFromUrl;
}
