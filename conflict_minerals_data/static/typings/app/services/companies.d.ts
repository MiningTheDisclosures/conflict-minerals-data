import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare class CompaniesService {
    private http;
    private apiURL;
    constructor(http: Http);
    getCompanies(): Promise<any[]>;
    private handleError(error);
}
