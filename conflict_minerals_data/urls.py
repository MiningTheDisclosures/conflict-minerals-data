from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic.base import TemplateView
from rest_framework import routers

from conflict_minerals_data.edgar import views

router = routers.DefaultRouter()
router.register(r'companies', views.EdgarCompanyInfoViewSet)


class App(TemplateView):
    template_name = 'app.html'


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^$', App.as_view()),
    url(r'^api/', include(router.urls)),
    url(r'^api/companies-bulk/', views.EdgarCompanyListView.as_view()),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', admin.site.urls),
]

