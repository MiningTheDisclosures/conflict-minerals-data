import requests
import feedparser

from datetime import datetime


def get_edgar_feed_url(search_item):
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


def get_annual_sd_filings_from_cik(cik):
    filings = {}
    feed = get_feed_from_edgar(cik, 'SD')
    for entry in feed.entries:
        str_date = entry['filing-date']
        date = datetime.strptime(str_date, '%Y-%m-%d')
        year = str(date.year)
        links = entry['links']
        if len(links) != 1:
            return {'status': 'error', 'message': 'There was an error'}
        filings[year] = {'year': year, 'url': links[0]['href']}
    return filings

