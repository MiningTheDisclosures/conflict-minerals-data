import { DataSource } from '@angular/cdk';
import { MdSort } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
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
    sort: MdSort;
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
    private _sort;
    constructor(_data: DocumentsData, _sort: MdSort);
    connect(): Observable<IFiling[]>;
    disconnect(): void;
    private getSortedData();
    private compareCompanyName(a, b);
}
