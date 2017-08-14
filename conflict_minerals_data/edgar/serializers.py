from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer

from .models import (
    EdgarCompanyInfo,
    EdgarSDFiling,
    EdgarSDFilingDocument,
)


class EdgarCompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdgarCompanyInfo
        fields = '__all__'


class EdgarCompanyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdgarCompanyInfo
        fields = ('cik', 'ticker_symbol')
        list_serializer_class = BulkListSerializer


class EdgarSDFilingSerializer(serializers.ModelSerializer):
    extracted_urls = serializers.ReadOnlyField()
    class Meta:
        model = EdgarSDFiling
        fields = '__all__'


class EdgarSDFilingDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdgarSDFilingDocument
        fields = '__all__'
