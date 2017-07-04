from django.contrib import admin

from .models import (
    EdgarSearch,
    EdgarCompanyInfo,
    EdgarSDFiling,
    EdgarSDFilingDocument,
)

admin.site.register(EdgarSearch)
admin.site.register(EdgarCompanyInfo)
admin.site.register(EdgarSDFiling)
admin.site.register(EdgarSDFilingDocument)
