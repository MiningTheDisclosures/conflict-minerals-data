import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { IDocument, IDocumentResponse } from '../models';
export declare class DocumentsService {
    private http;
    documents: IDocument[];
    constructor(http: Http);
    getResponse(url: string): Observable<IDocumentResponse>;
    getDocuments(url?: string): void;
}
