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
  Document,
  DocumentResponse,
} from '../models';

@Injectable()
export class DocumentsService {
  documents: Document[] = [];
  constructor(private http: Http) { 
  }

  getResponse(url: string): Observable<DocumentResponse> {
    return this.http
      .get(url)
      .map((response: Response) => {
        return (response.json() as DocumentResponse);
      })
  }

  getDocuments(url?: string) {
    if (!url) {
      url = '/api/filing-documents';
    }
    this.getResponse(url).subscribe(
      (data) => {
        this.documents = this.documents.concat(data.results);
        if ( data.next ) {
          return this.getDocuments(data.next);
        }
      }
    )
  }

}
