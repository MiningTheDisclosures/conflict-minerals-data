export interface DjangoAPIResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: any[];
}
export interface Company {
    id: number;
    cik: string;
    conformed_name: string;
    ticker_symbol?: string;
    sic_code?: string;
    sic_description?: string;
    state_location?: string;
}
export interface CompanyResponse extends DjangoAPIResponse {
    results: Company[];
}
export interface Filing {
    id: number;
    filing_type: string;
    sec_accession_number: string;
    company: number;
    date: Date;
    link: string;
}
export interface FilingResponse extends DjangoAPIResponse {
    results: Filing[];
}
export interface Document {
    id: number;
    filing: number;
    seq: number;
    description: string;
    doc_type: string;
    doc_size: number;
    doc_name: string;
    doc_url: string;
    doc_format: string;
}
export interface DocumentResponse extends DjangoAPIResponse {
    results: Document[];
}
