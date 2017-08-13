import { ICompany, IFiling, IDocument } from './index';
export declare class Company implements ICompany {
    id: number;
    cik: string;
    conformed_name: string;
    ticker_symbol?: string;
    sic_code?: string;
    sic_description?: string;
    state_location?: string;
    constructor(result: any);
}
export declare class Filing implements IFiling {
    id: number;
    filing_type: string;
    sec_accession_number: string;
    company_id: number;
    company: Company;
    date: Date;
    link: string;
    constructor(result: any);
}
export declare class FilingDocument implements IDocument {
    id: number;
    filing_id: number;
    filing: IFiling;
    seq: number;
    description: string;
    doc_type: string;
    doc_size: number;
    doc_name: string;
    doc_url: string;
    doc_format: string;
}
