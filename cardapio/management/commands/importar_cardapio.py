from datetime import datetime
from django.core.management.base import BaseCommand
from cardapio.models import CardapioDia


class Command(BaseCommand):
    help = "Popula o cardápio escolar no Banco de Dados"

    def handle(self, *args, **options):
        self.stdout.write(
            self.style.NOTICE("Iniciando importação do cardápio de Junho/2026...")
        )

        # Dados estruturados fixos para garantir a carga inicial independente do arquivo físico
        dados_cardapio = [
            # Semana 1
            {
                "data": "2026-06-01",
                "dia": "Segunda-feira",
                "m": "LEITE ADOÇADO, CEREAL DE MILHO SEM AÇÚCAR",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, ISCA DE CARNE COM CENOURA, SALADA DE REPOLHO, MELANCIA",
                "t": "SUCO DE MANGA POLPA, PÃO DE FORMA COM QUEIJO PRATO",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-02",
                "dia": "Terça-feira",
                "m": "CAFÉ COM LEITE, PÃO DE FORMA INTEGRAL COM REQUEIJÃO",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, SOBRECOXA AO MOLHO, SALADA DE BETERRABA COZIDA, MAÇÃ",
                "t": "LEITE COM POLPA DE MANGA, BISCOITO CREAM CRACKER COM REQUEIJÃO",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-03",
                "dia": "Quarta-feira",
                "m": "LEITE COM POLPA DE MANGA, BISCOITO CREAM CRACKER COM REQUEIJÃO",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, CARNE MOIDA COM BATATA, POLENTA CREMOSA, SALADA DE ALFACE E TOMATE, PERA",
                "t": "SUCO DE ABACAXI, BISCOITO CREAM CRACKER COM MARGARINA",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-04",
                "dia": "Quinta-feira",
                "m": "",
                "a": "",
                "t": "",
                "f": True,
                "o": "FERIADO - CORPUS CHRISTI",
            },
            {
                "data": "2026-06-05",
                "dia": "Sexta-feira",
                "m": "",
                "a": "",
                "t": "",
                "f": True,
                "o": "PONTO FACULTATIVO",
            },
            # Semana 2
            {
                "data": "2026-06-08",
                "dia": "Segunda-feira",
                "m": "SUCO DE MANGA POLPA, PÃO DE FORMA COM QUEIJO PRATO",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, FRICASSE DE FRANGO, BATATA PALHA, SALADA DE ACELGA, LARANJA",
                "t": "SUCO DE POLPA DE ABACAXI, BISCOITO CREAM CRACKER COM MARGARINA",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-09",
                "dia": "Terça-feira",
                "m": "LEITE ADOÇADO, CEREAL DE MILHO SEM AÇÚCAR",
                "a": "ARROZ, FEIJÃO CARIOCA, CARNE MOÍDA COM MANDIOCA, SALADA DE PEPINO, BANANA",
                "t": "CAFÉ COM LEITE, PÃO DE FORMA DE LEITE COM REQUEIJÃO",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-10",
                "dia": "Quarta-feira",
                "m": "SUCO DE ABACAXI, CUSCUZ NORDESTINO COM MARGARINA",
                "a": "MACARRÃO À BOLONHESA, SALADA DE ALFACE, ABACAXI",
                "t": "LEITE ADOÇADO COM CACAU, BISCOITO MARIA",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-11",
                "dia": "Quinta-feira",
                "m": "LEITE ADOÇADO COM CACAU, ROSQUINHA DOCE",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, CARNE CUBOS COM ABOBRINHA, SALADA REPOLHO COM CENOURA, MAÇÃ",
                "t": "LEITE ADOÇADO, CEREAL DE MILHO SEM AÇÚCAR",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-12",
                "dia": "Sexta-feira",
                "m": "CAFÉ COM LEITE, PÃO DE LEITE COM MARGARINA",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, CARNE BOVINA COM CHUCHU, SALADA DE BETERRABA RALADA, MAMÃO, PIPOCA",
                "t": "LEITE COM POLPA DE GOIABA, PÃO DE FORMA COM QUEIJO PRATO",
                "f": False,
                "o": "",
            },
            # Última Semana (Junina)
            {
                "data": "2026-06-29",
                "dia": "Segunda-feira",
                "m": "LEITE ADOÇADO, CEREAL DE MILHO",
                "a": "ARROZ BRANCO, FEIJÃO CARIOCA, STROGONOFF DE FRANGO, BATATA PALHA, PERA",
                "t": "SUCO DE ABACAXI",
                "f": False,
                "o": "",
            },
            {
                "data": "2026-06-30",
                "dia": "Terça-feira",
                "m": "LEITE COM POLPA DE MANGA, BISCOITO",
                "a": "ARROZ, FEIJÃO, SOBRECOXA AO MOLHO, POLENTA, MAÇÃ",
                "t": "PÃO COM REQUEIJÃO",
                "f": False,
                "o": "ENCERRAMENTO DO MÊS",
            },
        ]

        for item in dados_cardapio:
            dt = datetime.strptime(item["data"], "%Y-%m-%d").date()
            CardapioDia.objects.update_or_create(
                data=dt,
                defaults={
                    "dia_semana": item["dia"],
                    "lanche_manha": item["m"],
                    "almoco": item["a"],
                    "lanche_tarde": item["t"],
                    "eja": item["a"] if not item["f"] else "",
                    "eh_feriado": item["f"],
                    "observacao": item["o"],
                },
            )

        self.stdout.write(
            self.style.SUCCESS("Banco de dados local alimentado com sucesso!")
        )
