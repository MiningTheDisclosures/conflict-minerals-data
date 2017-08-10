export
interface Company {
  cik: string;
  conformed_name: string;
  ticker_symbol?: string;
  sic_code?: string;
  sic_description?: string;
  state_locatin?: string;
}

export
interface DjangoAPIResponse {
  count: number;
  next: string | null; // url
  previous: string | null;
  results: any[]
}

export
interface CompanyResponse extends DjangoAPIResponse {
  results: Company[];
}