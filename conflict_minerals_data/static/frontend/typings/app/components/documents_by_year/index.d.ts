import { ActivatedRoute } from '@angular/router';
import { CompaniesService } from '../../services/companies';
import { FilingsService } from '../../services/filings';
import { ICompany, IFiling } from '../../models';
export declare class DocumentsByYear {
    private activatedRoute;
    private companiesService;
    private filingsService;
    year: number;
    constructor(activatedRoute: ActivatedRoute, companiesService: CompaniesService, filingsService: FilingsService);
    readonly companies: Map<number, ICompany>;
    readonly filings: IFiling[];
    ngOnInit(): void;
    ngOnChanges(): void;
}
