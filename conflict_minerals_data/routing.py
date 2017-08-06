"""
The routes for the channel server
"""
from channels.routing import route
from conflict_minerals_data.edgar.consumers import (
    pull_company_info_using_ticker,
    pull_company_info_using_cik,
    get_sd_filings_for_company,
    update_company_info_and_sd_filings,
    pull_sd_filing_documents,
    get_sd_filing_document_contents,
)

CHANNEL_ROUTING = [
    route('edgar.pull-company-info-using-ticker', pull_company_info_using_ticker),
    route('edgar.pull-company-info-using-cik', pull_company_info_using_cik),
    route('edgar.get-sd-filings-for-company', get_sd_filings_for_company),
    route('edgar.update-company-info-and-sd-filings', update_company_info_and_sd_filings),
    route('edgar.pull-sd-filing-documents', pull_sd_filing_documents),
    route('edgar.get-sd-filing-document-contents', get_sd_filing_document_contents),
]
