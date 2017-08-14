from itertools import chain
from toolz import filter, unique

from django.contrib.postgres.fields import ArrayField
from django.core.exceptions import ValidationError
from django.db import models

from bs4 import BeautifulSoup

def compact(iter):
    return filter(None, iter)


class EdgarSearch(models.Model):
    class Meta:
        verbose_name_plural = 'Edgar Requests'

    description = models.TextField(help_text='Description of the request.')
    request = models.TextField()
    response = models.TextField()
    date_accessed = models.DateTimeField(auto_now_add=True)


class EdgarCompanyInfo(models.Model):
    class Meta:
        verbose_name_plural = 'Companies'

    cik = models.CharField(max_length=200, blank=True, unique=True)
    conformed_name = models.CharField(max_length=200, blank=True)
    ticker_symbol = models.CharField(max_length=10, blank=True)

    # Industry code
    sic_code = models.CharField(max_length=200, blank=True)
    sic_description = models.CharField(max_length=200, blank=True)

    state_location = models.CharField(max_length=10, blank=True)

    def clean(self):
        if not self.cik or not self.ticker_symbol:
            raise ValidationError('Must have CIK or Ticker Symbol at least')

    def __str__(self):
        return self.conformed_name


class EdgarSDFiling(models.Model):
    class Meta:
        verbose_name = 'SD Filing'
        verbose_name_plural = 'SD Filings'

    FILING_TYPE_CHOICES = (
        ('SD', 'SD'),
        ('SD/A', 'SD/A'),
    )
    filing_type = models.CharField(max_length=10, choices=FILING_TYPE_CHOICES)
    sec_accession_number = models.CharField(max_length=200)
    company = models.ForeignKey(EdgarCompanyInfo, on_delete=models.CASCADE, blank=True, null=True)
    date = models.DateField(blank=True, null=True, help_text='Filing Date')
    accepted = models.DateTimeField(blank=True, null=True, help_text='Accepted Date')
    link = models.TextField(blank=True, null=True)

    def __str__(self):
        return '{company} - {date:%Y} ({type})'.format(
            type=self.filing_type, date=self.date, company=self.company
        )

    @property
    def extracted_urls(self):
        docs = self.edgarsdfilingdocument_set.all()
        urls = docs.values_list('edgardocumentcontent__urls', flat=True)
        compacted = compact(urls)
        flattened = chain.from_iterable(compacted)
        unique_urls = unique(flattened)
        return list(unique_urls)

    @property
    def year(self):
        return self.date.year

    @classmethod
    def get_or_create_from_feed_entry(cls, entry, company):
        """
        Note the typo in the feed keys 'accession-nunber'
        """
        filing_type = entry.get('filing-type')
        filing_types = dict(cls.FILING_TYPE_CHOICES).keys() # Pulls the first values from the pairs into a list
        assert filing_type in filing_types, 'Filing type was {0}. Company: {2}. Entry: {1}'.format(
            filing_type, entry, company
        )
        obj, _ = cls.objects.get_or_create(
            filing_type=filing_type,
            sec_accession_number=entry.get('accession-nunber')
        )
        if obj.company:
            # Test something hasn't gone wierd
            assert obj.company == company, 'Mismatched Company. obj.company = {0}. company = {1}|{2}'.format(
                obj.company.pk, company.pk, company.conformed_name,
            )
        else:
            obj.company = company
        obj.date = entry.get('filing-date')
        obj.accepted = entry.get('updated')
        obj.link = entry.get('link')
        return obj.save()

    @classmethod
    def get_document_soup_from_page(cls, page):
        """
        page is requests.Response.content
        """
        soup = BeautifulSoup(page, 'html.parser')
        # Get only one table
        table_attrs = dict(summary='Document Format Files')
        assert len(soup.find_all('table', attrs=table_attrs)) == 1, 'Wrong number of Tables'
        table = soup.find('table', attrs=table_attrs)
        # Check the header row (note order is important)
        header_values = ['Seq', 'Description', 'Document', 'Type', 'Size']
        headers = table.findChildren('th')
        for i, header in enumerate(headers):
            assert header.text == header_values[i]
        # Return Table Rows (but not header row)
        return table.findChildren('tr')[1:]  


class EdgarSDFilingDocument(models.Model):
    class Meta:
        verbose_name_plural = 'SD Filing Documents'

    filing = models.ForeignKey(EdgarSDFiling, on_delete=models.CASCADE)
    seq = models.PositiveIntegerField(blank=True, null=True)
    description = models.CharField(max_length=200)
    doc_type = models.CharField(max_length=50, blank=True)
    doc_size = models.PositiveIntegerField()
    doc_name = models.CharField(max_length=200)
    doc_url = models.TextField()
    doc_format = models.CharField(max_length=10)

    def __str__(self):
        return '{filing} - {name}'.format(filing=self.filing, name=self.doc_name)

    @classmethod
    def get_or_create_from_table_row(cls, row, filing):
        """
        We just know the order of the data - see the check of the header values in
        EdgarSDFiling.get_document_soup_from_page
        ['Seq', 'Description', 'Document', 'Type', 'Size']
        """
        base_url = 'https://www.sec.gov'
        cells = row.findChildren('td')
        seq = cells[0].get_text(strip=True)
        description = cells[1].get_text()
        doc_name = cells[2].a.get_text()
        doc_url = cells[2].a.attrs['href']
        doc_type = cells[3].get_text()
        doc_size = int(cells[4].get_text())
        doc_format = doc_name.split('.')[-1]
        obj, _ = cls.objects.get_or_create(
            filing=filing,
            description=description,
            doc_size=doc_size,
            doc_name=doc_name,
            doc_url='{base}/{doc}'.format(base=base_url, doc=doc_url),
            doc_format=doc_format,
            doc_type=doc_type,
        )
        if seq:
            obj.seq = int(seq)
        return obj.save()


class EdgarDocumentContent(models.Model):
    class Meta:
        verbose_name_plural = 'Document Content'

    document = models.ForeignKey(EdgarSDFilingDocument, on_delete=models.CASCADE)
    binary = models.BinaryField(blank=True, null=True)
    text = models.TextField(blank=True)
    # Stuff we store about the content
    urls = ArrayField(
        models.TextField(blank=True), 
        blank=True, null=True,
        help_text='URL we parsed out of the content'
    )

    def __str__(self):
        return self.document.doc_name

    def clean(self):
        if self.binary and self.text:
            raise ValidationError('Can only store one type of content')
        if not self.binary and not self.text:
            raise ValidationError('Must store some content')

    @property
    def content(self):
        if self.binary:
            return self.binary
        elif self.text:
            return self.text
