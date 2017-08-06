from channels import Channel
from django.contrib import admin

from .models import (
    EdgarSearch,
    EdgarCompanyInfo,
    EdgarSDFiling,
    EdgarSDFilingDocument,
)


def _send_message(queryset, channel_name):
    pks = list(queryset.values_list('pk', flat=True))
    msg = dict(pks=pks)
    Channel(channel_name).send(msg)


def pull_company_info_using_ticker(_modeladmin, _request, queryset):
    _send_message(queryset, 'edgar.pull-company-info-using-ticker')
pull_company_info_using_ticker.short_description = 'Get company info from EDGAR (ticker)'


def pull_company_info_using_cik(_modeladmin, _request, queryset):
    _send_message(queryset, 'edgar.pull-company-info-using-cik')
pull_company_info_using_cik.short_description = 'Get company info from EDGAR (cik)'


def get_sd_filings_for_company(_modeladmin, _request, queryset):
    _send_message(queryset, 'edgar.get-sd-filings-for-company')
get_sd_filings_for_company.short_description = 'Get SD filings for company'


def update_company_info_and_sd_filings(_modeladmin, _request, queryset):
    _send_message(queryset, 'edgar.update-company-info-and-sd-filings')
update_company_info_and_sd_filings.short_description = 'Update company info and SD filings'


def pull_sd_filing_documents(_modeladmin, _request, queryset):
    _send_message(queryset, 'edgar.pull-sd-filing-documents')
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

    actions = [
        pull_sd_filing_documents,
    ]

admin.site.register(EdgarSearch, SearchAdmin)
admin.site.register(EdgarCompanyInfo, CompanyAdmin)
admin.site.register(EdgarSDFiling, SDFilingAdmin)
admin.site.register(EdgarSDFilingDocument)
