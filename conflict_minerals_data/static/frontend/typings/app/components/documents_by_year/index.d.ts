import { DataSource } from '@angular/cdk';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CompaniesService, DocumentsService, FilingsService } from '../../services';
import { ICompany, IDocument, IFiling } from '../../models';
export declare class DocumentsByYear {
    private activatedRoute;
    private companiesService;
    private documentsService;
    private filingsService;
    displayedColumns: string[];
    data: DocumentsData;
    dataSource: DocumentsSource | null;
    constructor(activatedRoute: ActivatedRoute, companiesService: CompaniesService, documentsService: DocumentsService, filingsService: FilingsService);
    ngOnInit(): void;
}
export declare class DocumentsData {
    private companiesService;
    private documentsService;
    private filingsService;
    year: number;
    dataChange: BehaviorSubject<IFiling[]>;
    constructor(companiesService: CompaniesService, documentsService: DocumentsService, filingsService: FilingsService);
    readonly companies: Map<number, ICompany>;
    readonly documents: IDocument[];
    private processFilings();
    params: Params;
}
export declare class DocumentsSource extends DataSource<any> {
    private _data;
    constructor(_data: DocumentsData);
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<IFiling[]>;
    disconnect(): void;
}
