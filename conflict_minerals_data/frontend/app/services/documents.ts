import {
  IDocument,
} from '../models';

import {
  DjangoAPIService
} from './django_api';

export 
class DocumentsService extends DjangoAPIService {
  documents: IDocument[] = [];

  initialize() {
    this.url = '/api/filing-documents/'
  }

  protected processResults(results: IDocument[]) {
    this.documents = this.documents.concat(results)
  }

}