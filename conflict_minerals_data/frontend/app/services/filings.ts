import {
  Filing,
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
    for ( let result of results )  {
      this.filings.push(new Filing(result));
    }
  }

}
