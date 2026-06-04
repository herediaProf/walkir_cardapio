from rest_framework import serializers
from .models import CardapioDia


class CardapioDiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardapioDia
        fields = "__all__"  # Vai expor todos os campos (data, almoço, lanche, etc.)
