from django.contrib import admin
from .models import CardapioDia


@admin.register(CardapioDia)
class CardapioDiaAdmin(admin.ModelAdmin):
    # Colunas que vão aparecer na tabela de listagem
    list_display = ("data", "dia_semana", "eh_feriado", "observacao")

    # Filtros laterais para facilitar a navegação
    list_filter = ("eh_feriado", "dia_semana")

    # Campo de busca rápida
    search_fields = ("lanche_manha", "almoco", "lanche_tarde", "eja", "observacao")

    # Ordenação padrão por data
    ordering = ("data",)
