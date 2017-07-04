from rest_framework import viewsets

from .models import (
    EdgarCompanyInfo,
)
from .serializers import EdgarCompanyInfoSerializer


class EdgarCompanyInfoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = EdgarCompanyInfo.objects.all().order_by('-date_joined')
    serializer_class = EdgarCompanyInfoSerializer
