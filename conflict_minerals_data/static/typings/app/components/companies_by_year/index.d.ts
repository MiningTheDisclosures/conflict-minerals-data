import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompaniesService } from '../../services/companies';
import { FilingsService } from '../../services/filings';
import { ICompany, IFiling } from '../../models';
export declare class CompaniesByYear {
    private companiesService;
    private filingsService;
    year: Subscription;
    route: ActivatedRoute;
    constructor(route: ActivatedRoute, companiesService: CompaniesService, filingsService: FilingsService);
    readonly companies: ICompany[];
    readonly filings: IFiling[];
    ngOnInit(): void;
    ngOnChanges(): void;
}
