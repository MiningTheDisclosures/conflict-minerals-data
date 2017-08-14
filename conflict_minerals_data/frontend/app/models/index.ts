import * as models from './models';

export
interface IDjangoAPIResponse {
  count: number;
  next: string | null; // url
  previous: string | null;
  results: any[]
}

export
interface ICompany {
  id: number;
  cik: string;
  conformed_name: string;
  ticker_symbol?: string;
  sic_code?: string;
  sic_description?: string;
  state_location?: string;
}

export
interface ICompanyResponse extends IDjangoAPIResponse {
  results: ICompany[];
}

export
interface IFiling {
  id: number;
  company_id: number
  company: ICompany;
  date: Date;
  filing_type: string;
  link: string;
  documents: IDocument[];
  sec_accession_number: string;
  extracted_urls: string[];
}

export
interface IFilingResponse extends IDjangoAPIResponse {
  results: IFiling[];
}

export
interface IDocument {
  id: number;
  filing_id: number
  filing: IFiling; 
  seq: number;
  description: string;
  doc_type: string;
  doc_size: number;
  doc_name: string;
  doc_url: string;
  doc_format: string;
}

export
interface IDocumentResponse extends IDjangoAPIResponse {
  results: IDocument[];
}

export import Company = models.Company;
export import Filing = models.Filing;
export import Document = models.Document;
