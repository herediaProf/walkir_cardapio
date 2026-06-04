from rest_framework import viewsets
from .models import CardapioDia
from .serializers import CardapioDiaSerializer


class CardapioDiaViewSet(viewsets.ModelViewSet):
    queryset = CardapioDia.objects.all().order_by("data")
    serializer_class = CardapioDiaSerializer

    # Opcional: Permite filtrar diretamente na URL ex: ?data=2026-06-01
    def get_queryset(self):
        queryset = CardapioDia.objects.all().order_by("data")
        data_param = self.request.query_params.get("data")
        if data_param:
            queryset = queryset.filter(data=data_param)
        return queryset
