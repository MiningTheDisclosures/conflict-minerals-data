import feedparser
import json
from random import randint
from time import sleep
from django.contrib import admin

from .models import (
    EdgarSearch,
    EdgarCompanyInfo,
    EdgarSDFiling,
    EdgarSDFilingDocument,
)
from .parsing import (
    get_edgar_feed_url,
    get_annual_sd_filings_from_cik,
)

def _wait_random_time():
    sleep(randint(0, 50)/100)

def _make_request(search):
    url = get_edgar_feed_url(search)
    feed = feedparser.parse(url)
    EdgarSearch.objects.create(
        description='SD Feed for populating company {0}'.format(search),
        request=url,
        response=json.dumps(feed, indent=4)
    )
    return feed

def _update_company_from_feed(company, feed):
    meta = feed['feed']
    cik = meta.get('cik')
    if cik:
        company.cik = cik
    conformed_name = meta.get('conformed-name')
    if conformed_name:
        company.conformed_name = conformed_name
    sic_code = meta.get('assigned-sic')
    if sic_code:
        company.sic_code = sic_code
    sic_description = meta.get('assigned-sic-desc')
    if sic_description:
        company.sic_description = sic_description
    state_location = meta.get('state-location')
    if state_location:
        company.state_location = state_location
    return company


def pull_company_info_using_ticker(modeladmin, request, queryset):
    for company in queryset:
        _wait_random_time()
        ticker_id = company.ticker_symbol
        if not ticker_id:
            continue
        feed = _make_request(ticker_id)
        company = _update_company_from_feed(company, feed)
        company.save()
pull_company_info_using_ticker.short_description = 'Get company info from EDGAR (ticker)'


def pull_company_info_using_cik(modeladmin, request, queryset):
    for company in queryset:
        _wait_random_time()
        cik = company.cik
        if not cik:
            continue
        feed = _make_request(cik)
        company = _update_company_from_feed(company, feed)
        company.save()
pull_company_info_using_cik.short_description = 'Get company info from EDGAR (cik)'


def get_sd_filings_for_company(modeladmin, request, queryset):
    for company in queryset:
        _wait_random_time()
        cik = company.cik
        if not cik:
            continue
        feed = _make_request(cik)
        for entry in feed.entries:
            EdgarSDFiling.get_or_create_from_feed_entry(entry, company)

get_sd_filings_for_company.short_description = 'Get SD filings for company'


def update_company_info_and_sd_filings(modeladmin, request, queryset):
    for company in queryset:
        _wait_random_time()
        search = None
        if company.ticker_symbol:
            search = company.ticker_symbol
        if company.cik:
            search = company.cik
        feed = _make_request(search)
        company = _update_company_from_feed(company, feed)
        company.save()
        for entry in feed.entries:
            EdgarSDFiling.get_or_create_from_feed_entry(entry, company)
update_company_info_and_sd_filings.short_description = 'Update company info and SD filings'


def pull_sd_filing_documents(modeladmin, request, queryset):
    pass
pull_sd_filing_documents.short_description = 'Pull SD filing documents'


class CompanyAdmin(admin.ModelAdmin):
    list_display = ['conformed_name', 'ticker_symbol', 'cik']
    ordering = ['conformed_name']
    actions = [
        pull_company_info_using_ticker, 
        pull_company_info_using_cik,
        get_sd_filings_for_company,
        update_company_info_and_sd_filings,
    ]


class SearchAdmin(admin.ModelAdmin):
    list_display = ['description', 'date_accessed']


class SDFilingAdmin(admin.ModelAdmin):
    list_display = ['company', 'year', 'filing_type', 'sec_accession_number']
    ordering = ['company__conformed_name', '-date']
    list_filter = ['company__conformed_name']

admin.site.register(EdgarSearch, SearchAdmin)
admin.site.register(EdgarCompanyInfo, CompanyAdmin)
admin.site.register(EdgarSDFiling, SDFilingAdmin)
admin.site.register(EdgarSDFilingDocument)