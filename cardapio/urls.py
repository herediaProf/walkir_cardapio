from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CardapioDiaViewSet

router = DefaultRouter()
router.register(r"dias", CardapioDiaViewSet, basename="cardapiodia")

urlpatterns = [
    path("", include(router.urls)),
]
