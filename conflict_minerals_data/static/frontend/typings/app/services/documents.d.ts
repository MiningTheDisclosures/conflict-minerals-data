import { Document, IDocument } from '../models';
import { DjangoAPIService } from './django_api';
export declare class DocumentsService extends DjangoAPIService {
    private _documents;
    initialize(): void;
    readonly documents: Document[];
    protected processResults(results: IDocument[]): void;
}
