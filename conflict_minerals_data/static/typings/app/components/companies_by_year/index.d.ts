import { CompaniesService } from '../../services/companies';
export declare class CompaniesByYear {
    private companiesService;
    constructor(companiesService: CompaniesService);
    companies: any[];
    getCompanies(): void;
    ngOnInit(): void;
}
