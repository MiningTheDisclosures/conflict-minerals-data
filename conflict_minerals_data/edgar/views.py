import django_filters
from django_filters import rest_framework as filters

from rest_framework import viewsets, generics
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView

from .models import (
    EdgarCompanyInfo,
    EdgarSDFiling,
    EdgarSDFilingDocument,
)
from .serializers import (
    EdgarCompanyInfoSerializer,
    EdgarCompanyListSerializer,
    EdgarSDFilingSerializer,
    EdgarSDFilingDocumentSerializer,
)


class EdgarCompanyInfoViewSet(viewsets.ModelViewSet):
    queryset = EdgarCompanyInfo.objects.all()
    serializer_class = EdgarCompanyInfoSerializer


class EdgarCompanyInfoBulkView(ListBulkCreateUpdateDestroyAPIView):
    # Used for bulk changes

    # Can be used for all kinds of changes - perhaps should be restricted to POST
    queryset = EdgarCompanyInfo.objects.all()
    serializer_class = EdgarCompanyListSerializer


class EdgarSDFilingFilter(filters.FilterSet):
    year = django_filters.NumberFilter(name='date', lookup_expr='year')
    class Meta:
        model = EdgarSDFiling
        fields = '__all__'


class EdgarSDFilingListView(generics.ListAPIView):
    queryset = EdgarSDFiling.objects.all()
    serializer_class = EdgarSDFilingSerializer
    filter_class = EdgarSDFilingFilter


class EdgarSDFilingDocumentFilter(filters.FilterSet):
    year = django_filters.NumberFilter(name='filing__date', lookup_expr='year')
    class Meta:
        model = EdgarSDFilingDocument
        fields = '__all__'


class EdgarSDFilingDocumentListView(generics.ListAPIView):
    queryset = EdgarSDFilingDocument.objects.all()
    serializer_class = EdgarSDFilingDocumentSerializer
    filter_class = EdgarSDFilingDocumentFilter
