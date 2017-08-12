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
  IDocument,
  IDocumentResponse,
} from '../models';

@Injectable()
export class DocumentsService {
  documents: IDocument[] = [];
  constructor(private http: Http) { 
  }

  getResponse(url: string): Observable<IDocumentResponse> {
    return this.http
      .get(url)
      .map((response: Response) => {
        return (response.json() as IDocumentResponse);
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
