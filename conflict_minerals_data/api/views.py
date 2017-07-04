from rest_framework import viewsets, generics
from rest_framework_bulk import ListBulkCreateUpdateDestroyAPIView

from .models import EdgarCompanyInfo
from .serializers import (
    EdgarCompanyInfoSerializer,
    EdgarCompanyListSerializer
)


class CompanyInfoViewSet(viewsets.ModelViewSet):
    # Complete CRUD
    queryset = EdgarCompanyInfo.objects.all()
    serializer_class = EdgarCompanyInfoSerializer


class CompanyListView(ListBulkCreateUpdateDestroyAPIView):
    # Used for bulk changes

    # Can be used for all kinds of changes - perhaps should be restricted to POST
    queryset = EdgarCompanyInfo.objects.all()
    serializer_class = EdgarCompanyListSerializer