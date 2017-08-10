import { CompaniesService } from '../../services/companies';
import { Company } from '../../models';
export declare class CompaniesByYear {
    private companiesService;
    companies: Company[];
    constructor(companiesService: CompaniesService);
    getCompanies(url: string): void;
    ngOnInit(): void;
}
