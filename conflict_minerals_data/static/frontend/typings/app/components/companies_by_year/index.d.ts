import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompaniesService } from '../../services/companies';
import { FilingsService } from '../../services/filings';
import { ICompany, IFiling } from '../../models';
export declare class CompaniesByYear {
    private activatedRoute;
    private companiesService;
    private filingsService;
    year: Subscription;
    route: ActivatedRoute;
    constructor(activatedRoute: ActivatedRoute, companiesService: CompaniesService, filingsService: FilingsService);
    readonly companies: ICompany[];
    readonly filings: IFiling[];
    ngOnInit(): void;
}
