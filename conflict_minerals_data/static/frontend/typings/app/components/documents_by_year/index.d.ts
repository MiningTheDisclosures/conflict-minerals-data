import { ActivatedRoute } from '@angular/router';
import { CompaniesService, DocumentsService, FilingsService } from '../../services';
import { ICompany, IDocument, IFiling } from '../../models';
export declare class DocumentsByYear {
    private activatedRoute;
    private companiesService;
    private documentsService;
    private filingsService;
    year: number;
    constructor(activatedRoute: ActivatedRoute, companiesService: CompaniesService, documentsService: DocumentsService, filingsService: FilingsService);
    readonly companies: Map<number, ICompany>;
    readonly documents: IDocument[];
    readonly filings: IFiling[];
    ngOnInit(): void;
}
