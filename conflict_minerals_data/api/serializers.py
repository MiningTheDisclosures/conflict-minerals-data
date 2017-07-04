from rest_framework import serializers

from .models import (
    EdgarCompanyInfo,
)


class EdgarCompanyInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdgarCompanyInfo
        fields = '__all__'