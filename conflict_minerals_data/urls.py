from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic.base import TemplateView
from rest_framework import routers

from conflict_minerals_data.edgar import views as edgar_views
from conflict_minerals_data.auth import views as auth_views

router = routers.DefaultRouter()

class App(TemplateView):
    template_name = 'app.html'


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^$', App.as_view()),
    url(r'^app/', App.as_view()),
    # API
    url(r'^api/', include(router.urls)),
    url(r'^api/companies/', edgar_views.EdgarCompanyInfoViewSet.as_view()),
    url(r'^api/companies-bulk/', edgar_views.EdgarCompanyInfoBulkView.as_view()),
    url(r'^api/filings/', edgar_views.EdgarSDFilingListView.as_view()),
    url(r'^api/filing-documents/', edgar_views.EdgarSDFilingDocumentListView.as_view()),
    url(r'^api/user/', auth_views.UserView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # Other
    url(r'^filing-documents/(?P<pk>\d+)/pdf', edgar_views.EdgarSDFilingDocumentPDF.as_view()),
    # Admin
    url(r'^admin/', admin.site.urls),
]

