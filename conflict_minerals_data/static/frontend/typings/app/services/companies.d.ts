import { ICompany } from '../models';
import { DjangoAPIService } from './django_api';
export declare class CompaniesService extends DjangoAPIService {
    private _companies;
    initialize(): void;
    readonly companies: Map<number, ICompany>;
    protected processResults(results: ICompany[]): void;
}
