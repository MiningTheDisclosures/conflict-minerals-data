import {
  Company,
  ICompany,
} from '../models';

import {
  DjangoAPIService
} from './django_api';

export 
class CompaniesService extends DjangoAPIService {
  private _companies = new Map<number, ICompany>();

  initialize() {
    this.url = '/api/companies/'
  }

  get companies() { return this._companies; }

  protected processResults(results: ICompany[]) {
    for ( let result of results ) {
      this._companies.set(result.id, new Company(result))
    }
  }

}
