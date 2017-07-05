from django.core.exceptions import ValidationError
from django.db import models


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

    cik = models.CharField(max_length=200, blank=True)
    conformed_name = models.CharField(max_length=200, blank=True)
    ticker_symbol = models.CharField(max_length=10, blank=True)

    # Industry code
    sic_code = models.CharField(max_length=200, blank=True)
    sic_description = models.CharField(max_length=200, blank=True)

    state_location = models.CharField(max_length=10, blank=True)

    def clean(self):
        if not self.cik or not self.ticker_symbol:
            raise ValidationError('Must have CIK or Ticker Symbol at least')


class EdgarSDFiling(models.Model):
    class Meta:
        verbose_name_plural = 'SD Filings'

    company = models.ForeignKey(EdgarCompanyInfo, on_delete=models.CASCADE)
    date = models.DateField()
    accepted = models.DateTimeField()
    n_documents = models.PositiveIntegerField()
    sec_accession_number = models.CharField(max_length=200)
    link = models.TextField()


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


class EdgarDocumentContent(models.Model):
    class Meta:
        verbose_name_plural = 'Document Content'

    document = models.ForeignKey(EdgarSDFilingDocument, on_delete=models.CASCADE)
    binary = models.BinaryField(blank=True, null=True)
    text = models.TextField(blank=True)

    def clean(self):
        if self.binary and self.text:
            raise ValidationError('Can only store one type of content')
        if not self.binary and not self.text:
            raise ValidationError('Must store some content')

    @property
    def content(self):
        if self.binary:
            return binary
        elif self.text:
            return text