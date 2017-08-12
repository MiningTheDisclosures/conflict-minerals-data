import { CompaniesService } from '../../services/companies';
import { Company } from '../../models';
export declare class CompaniesByYear {
    private companiesService;
    constructor(companiesService: CompaniesService);
    readonly companies: Company[];
    ngOnInit(): void;
}
