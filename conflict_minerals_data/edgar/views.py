from django.http import HttpResponse, Http404
from django.shortcuts import get_object_or_404
from django.views.generic.detail import DetailView

import django_filters
from django_filters import rest_framework as filters

from rest_framework import viewsets, generics
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView

from weasyprint import HTML

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


class EdgarCompanyInfoViewSet(generics.ListAPIView):
    queryset = EdgarCompanyInfo.objects.all()
    serializer_class = EdgarCompanyInfoSerializer


@permission_classes((IsAuthenticated, ))
class EdgarCompanyInfoBulkView(ListBulkCreateUpdateDestroyAPIView):
    # Used for bulk changes

    # Can be used for all kinds of changes - perhaps should be restricted to POST
    queryset = EdgarCompanyInfo.objects.all()
    serializer_class = EdgarCompanyListSerializer


class EdgarSDFilingFilter(filters.FilterSet):
    year = django_filters.NumberFilter(field_name='date', lookup_expr='year')
    class Meta:
        model = EdgarSDFiling
        fields = '__all__'


class EdgarSDFilingListView(generics.ListAPIView):
    queryset = EdgarSDFiling.objects.all()
    serializer_class = EdgarSDFilingSerializer
    filter_class = EdgarSDFilingFilter


class EdgarSDFilingDocumentFilter(filters.FilterSet):
    year = django_filters.NumberFilter(field_name='filing__date', lookup_expr='year')
    class Meta:
        model = EdgarSDFilingDocument
        fields = '__all__'


class EdgarSDFilingDocumentListView(generics.ListAPIView):
    queryset = EdgarSDFilingDocument.objects.all().order_by('id')
    serializer_class = EdgarSDFilingDocumentSerializer
    filter_class = EdgarSDFilingDocumentFilter


class EdgarSDFilingDocumentPDF(DetailView):
    model = EdgarSDFilingDocument

    def get(self, request, *args, **kwargs):
        doc = get_object_or_404(EdgarSDFilingDocument, pk=kwargs.get('pk'))
        doc_content = doc.edgardocumentcontent_set.get()
        content = doc_content.content
        if not content:
            raise Http404("No content to convert.")
        doc = HTML(string=content)
        pdf_contents = doc.write_pdf()
        return HttpResponse(pdf_contents, content_type='application/pdf')
