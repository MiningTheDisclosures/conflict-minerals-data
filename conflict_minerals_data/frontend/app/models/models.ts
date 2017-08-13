import {
  ICompany,
  IFiling,
  IDocument
} from './index';


export
class Company implements ICompany {
  id: number;
  cik: string;
  conformed_name: string;
  ticker_symbol?: string;
  sic_code?: string;
  sic_description?: string;
  state_location?: string;

  constructor(result: any) {
    this.id = parseInt(result.id);  
    this.cik = result.cik;
    this.conformed_name = result.conformed_name;
    this.ticker_symbol = result.ticker_symbol;
    this.sic_code = result.sic_code;
    this.sic_description = result.sic_description;
    this.state_location = result.state_location;
  }
  
}


export
class Filing implements IFiling {
  id: number;
  filing_type: string;
  sec_accession_number: string;
  company_id: number;
  company: Company;
  date: Date;
  link: string;

  constructor(result: any) {
    this.id = parseInt(result.id);
    this.filing_type = result.filing_type;
    this.sec_accession_number = result.sec_accession_number;
    this.company_id = parseInt(result.company);
    this.date = new Date(result.date);
    this.link = result.link;
  }
}

export
class FilingDocument implements IDocument {
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