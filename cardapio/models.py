from django.db import models


class CardapioDia(models.Model):
    data = models.DateField(unique=True, verbose_name="Data do Cardápio")
    dia_semana = models.CharField(max_length=20, verbose_name="Dia da Semana")

    # Refeições do Dia
    lanche_manha = models.TextField(
        blank=True, null=True, verbose_name="Lanche da Manhã"
    )
    almoco = models.TextField(blank=True, null=True, verbose_name="Almoço")
    lanche_tarde = models.TextField(
        blank=True, null=True, verbose_name="Lanche da Tarde"
    )
    eja = models.TextField(blank=True, null=True, verbose_name="Jantar / EJA")

    # Informações Nutricionais
    zinco = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="Zinco (ZN)"
    )
    sodio = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="Sódio (NA)"
    )
    vitamina_a = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="Vitamina A (VITA)"
    )
    vitamina_c = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="Vitamina C (VITC)"
    )
    fibra = models.CharField(
        max_length=20, blank=True, null=True, verbose_name="Fibra (FIB)"
    )

    # Status
    eh_feriado = models.BooleanField(
        default=False, verbose_name="Feriado / Ponto Facultativo"
    )
    observacao = models.CharField(
        max_length=255, blank=True, null=True, verbose_name="Observações"
    )

    class Meta:
        ordering = ["data"]
        verbose_name = "Cardápio do Dia"
        verbose_name_plural = "Cardápios dos Dias"

    def __str__(self):
        return f"{self.data.strftime('%d/%m/%Y')} - {self.dia_semana}"
