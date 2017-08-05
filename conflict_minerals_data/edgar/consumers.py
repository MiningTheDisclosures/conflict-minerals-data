import json
from random import randint
from time import sleep

import feedparser
import requests

from .models import (
    EdgarSearch,
    EdgarCompanyInfo,
    EdgarSDFiling,
    EdgarSDFilingDocument,
)


def _wait_random_time():
    sleep(randint(0, 50)/100)


def _get_edgar_feed_url(search_item):
    base_url = "https://www.sec.gov/cgi-bin/browse-edgar"
    params = {
        'action': 'getcompany',
        'CIK': search_item,
        'type': 'SD',
        'owner': 'exclude',
        'start': 0,
        'count': 40,
        'output': 'atom',
    }
    req = requests.Request('GET', base_url, params=params)
    prepped = req.prepare()
    feed_url = prepped.url
    return feed_url


def _make_feed_request(search):
    url = _get_edgar_feed_url(search)
    feed = feedparser.parse(url)
    EdgarSearch.objects.create(
        description='SD Feed for populating company {0}'.format(search),
        request=url,
        response=json.dumps(feed, indent=4)
    )
    return feed


def _make_page_request(url):
    response = requests.get(url)
    EdgarSearch.objects.create(
        description='Get SD Page',
        request=url,
        response=response.content
    )
    return response


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


def _get_company_from_message(message):
    company = EdgarCompanyInfo.objects.get(pk=message.content.get('pk'))
    return company


def pull_company_info_using_ticker(message):
    company = _get_company_from_message(message)
    _wait_random_time()
    ticker_id = company.ticker_symbol
    if ticker_id:
        feed = _make_feed_request(ticker_id)
        company = _update_company_from_feed(company, feed)
        company.save()


def pull_company_info_using_cik(message):
    company = _get_company_from_message(message)
    _wait_random_time()
    cik = company.cik
    if cik:
        feed = _make_feed_request(cik)
        company = _update_company_from_feed(company, feed)
        company.save()


def get_sd_filings_for_company(message):
    company = _get_company_from_message(message)
    _wait_random_time()
    cik = company.cik
    if cik:
        feed = _make_feed_request(cik)
        for entry in feed.entries:
            EdgarSDFiling.get_or_create_from_feed_entry(entry, company)


def update_company_info_and_sd_filings(message):
    company = _get_company_from_message(message)
    _wait_random_time()
    search = None
    if company.ticker_symbol:
        search = company.ticker_symbol
    if company.cik:
        search = company.cik
    feed = _make_feed_request(search)
    company = _update_company_from_feed(company, feed)
    company.save()
    for entry in feed.entries:
        EdgarSDFiling.get_or_create_from_feed_entry(entry, company)


def pull_sd_filing_documents(message):
    filing = EdgarSDFiling.objects.get(pk=message.content.get('pk'))
    _wait_random_time()
    response = _make_page_request(filing.link)
    assert response.status_code == 200
    soupy_documents = EdgarSDFiling.get_document_soup_from_page(response.content)
    for row in soupy_documents:
        EdgarSDFilingDocument.get_or_create_from_table_row(row, filing)