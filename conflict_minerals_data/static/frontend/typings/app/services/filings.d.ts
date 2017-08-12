import { IFiling } from '../models';
import { DjangoAPIService } from './django_api';
export declare class FilingsService extends DjangoAPIService {
    filings: IFiling[];
    initialize(): void;
    protected processResults(results: IFiling[]): void;
}
