from rest_framework import serializers
from rest_framework_bulk import BulkListSerializer

from .models import EdgarCompanyInfo


class EdgarCompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdgarCompanyInfo
        fields = '__all__'


class EdgarCompanyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdgarCompanyInfo
        fields = ('cik', 'ticker_symbol')
        list_serializer_class = BulkListSerializer