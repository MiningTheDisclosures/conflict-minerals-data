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
    company_id: number;
    company: Company;
    date: Date;
    filing_type: string;
    link: string;
    documents: IDocument[];
    sec_accession_number: string;
    constructor(result: any);
}
export declare class Document implements IDocument {
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
    constructor(result: any);
}
