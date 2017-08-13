import { IDocument } from '../models';
import { DjangoAPIService } from './django_api';
export declare class DocumentsService extends DjangoAPIService {
    documents: IDocument[];
    initialize(): void;
    protected processResults(results: IDocument[]): void;
}
