import {
  Document,
  IDocument,
} from '../models';

import {
  DjangoAPIService
} from './django_api';

export 
class DocumentsService extends DjangoAPIService {
  private _documents: Document[] = [];

  initialize() {
    this.url = '/api/filing-documents/'
  }

  get documents() { return this._documents; }

  protected processResults(results: IDocument[]) {
    for ( let result of results ) {
      this._documents.push(new Document(result))
    }
  }
}
