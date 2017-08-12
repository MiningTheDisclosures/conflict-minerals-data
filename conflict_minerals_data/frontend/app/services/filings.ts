import {
  IFiling,
} from '../models';

import {
  DjangoAPIService
} from './django_api';

export 
class FilingsService extends DjangoAPIService {
  filings: IFiling[] = [];

  initialize() {
    this.url = '/api/filings/'
  }

  protected processResults(results: IFiling[]) {
    this.filings = this.filings.concat(results)
  }

}
