import { useState, useEffect } from 'react';
import { CloudSun, Utensils, Coffee, Moon, Calendar, Info, ShieldAlert } from 'lucide-react';

export default function App() {
  // Estado para controlar o dia selecionado (Iniciando na primeira segunda-feira de Junho de 2026)
  const [dataSelecionada, setDataSelecionada] = useState("2026-06-01");
  const [cardapioDoDia, setCardapioDoDia] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Lista dos dias de Junho de 2026 para gerar os botões do calendário local
  const diasJunho = [
    { data: "2026-06-01", label: "01", sem: "Seg" },
    { data: "2026-06-02", label: "02", sem: "Ter" },
    { data: "2026-06-03", label: "03", sem: "Qua" },
    { data: "2026-06-04", label: "04", sem: "Qui" },
    { data: "2026-06-05", label: "05", sem: "Feriado" },
    { data: "2026-06-08", label: "08", sem: "Seg" },
    { data: "2026-06-09", label: "09", sem: "Ter" },
    { data: "2026-06-10", label: "10", sem: "Qua" },
    { data: "2026-06-11", label: "11", sem: "Qui" },
    { data: "2026-06-12", label: "12", sem: "Sex" },
    { data: "2026-06-13", label: "13", sem: "Sab" },
    { data: "2026-06-14", label: "14", sem: "Dom" },
    { data: "2026-06-15", label: "15", sem: "Seg" },
    { data: "2026-06-16", label: "16", sem: "Ter" },
    { data: "2026-06-17", label: "17", sem: "Qua" },
    { data: "2026-06-18", label: "18", sem: "Qui" },
    { data: "2026-06-19", label: "19", sem: "Sex" },
    { data: "2026-06-20", label: "20", sem: "Sab" },
    { data: "2026-06-21", label: "21", sem: "Dom" },
    { data: "2026-06-22", label: "22", sem: "Seg" },
    { data: "2026-06-23", label: "23", sem: "Ter" },
    { data: "2026-06-24", label: "24", sem: "Qua" },
    { data: "2026-06-25", label: "25", sem: "Qui" },
    { data: "2026-06-26", label: "26", sem: "Sex" },
    { data: "2026-06-29", label: "29", sem: "Seg" },
    { data: "2026-06-30", label: "30", sem: "Ter" },
  ];

  // Efeito colateral para buscar dados na API toda vez que mudar o dia selecionado
  useEffect(() => {
    setCarregando(true);
    
    // Define dinamicamente a URL da API baseando-se em onde o front está rodando
    const apiBaseUrl = window.location.hostname === 'localhost'
      ? 'http://127.0.0.1:8000' 
      : 'https://walkircardapio-production-cf64.up.railway.app';

    fetch(`${apiBaseUrl}/api/cardapio/dias/?data=${dataSelecionada}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setCardapioDoDia(data[0]);
        } else {
          setCardapioDoDia(null);
        }
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao conectar com a API Backend:", err);
        setCarregando(false);
      });
  }, [dataSelecionada]);

  return (
    <div style={styles.container}>
      {/* CABEÇALHO DO PORTAL */}
      <header style={styles.header}>
        <h1 style={styles.titulo}>🏫 Portal Escolar - EM Walkir Vergani</h1>
        <p style={styles.subtitulo}>Acompanhe o cardápio diário da merenda e as condições meteorológicas locais.</p>
      </header>

      <div style={styles.dashboardGrid}>
        
        {/* SEÇÃO DA ESQUERDA: CALENDÁRIO & ESTAÇÃO */}
        <div style={styles.colunaEsquerda}>
          
          {/* WIDGET METEOROLÓGICO */}
          <div style={styles.cardClima}>
            <div style={styles.cardClimaHeader}>
              <CloudSun size={28} color="#00796b" />
              <h3 style={styles.cardClimaTitulo}>Estação Meteorológica - Boiçucanga</h3>
            </div>
            <p style={styles.cardClimaTexto}>
              Monitore a temperatura, vento e chuva ao vivo antes de sair de casa para a escola.
            </p>
            <a 
              href="https://hexacloud.com.br/dashboard/?session=estacaoboi" 
              target="_blank" 
              rel="noreferrer" 
              style={styles.botaoClima}
            >
              Acessar Painel Satélite Ao Vivo →
            </a>
          </div>

          {/* SELETOR DE CALENDÁRIO */}
          <div style={styles.cardCalendario}>
            <div style={styles.cardHeaderGeneric}>
              <Calendar size={20} color="#333" />
              <h3 style={styles.genericTitulo}>Selecione um Dia (Junho 2026)</h3>
            </div>
            
            <div style={styles.gradeBotoes}>
              {diasJunho.map((item) => (
                <button
                  key={item.data}
                  onClick={() => setDataSelecionada(item.data)}
                  style={{
                    ...styles.botaoDia,
                    backgroundColor: dataSelecionada === item.data ? '#0284c7' : '#f1f5f9',
                    color: dataSelecionada === item.data ? '#fff' : '#334155',
                    border: dataSelecionada === item.data ? '1px solid #0284c7' : '1px solid #cbd5e1'
                  }}
                >
                  <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.label}</span>
                  <span style={{ fontSize: '10px', opacity: 0.8 }}>{item.sem}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* SEÇÃO DA DIREITA: EXIBIÇÃO DETALHADA DO CARDÁPIO */}
        <div style={styles.colunaDireita}>
          <div style={styles.cardRefeicoes}>
            <h2 style={styles.refeicaoMainTitle}>
              🍽️ Refeições para {dataSelecionada.split('-').reverse().join('/')}
            </h2>

            {carregando ? (
              <p style={styles.loadingText}>Carregando cardápio oficial...</p>
            ) : cardapioDoDia ? (
              
              // 'f' corresponde ao campo Booleano de feriado enviado pelo backend
              cardapioDoDia.f ? (
                <div style={styles.containerFeriado}>
                  <ShieldAlert size={40} color="#dc2626" />
                  <h3 style={styles.tituloFeriado}>Não haverá Atendimento Escolar</h3>
                  <p style={styles.subFeriado}>{cardapioDoDia.o || "Feriado ou Ponto Facultativo"}</p>
                </div>
              ) : (
                <div style={styles.listaRefeicoes}>
                  
                  {/* LANCHE DA MANHÃ */}
                  <div style={styles.itemRefeicao}>
                    <div style={styles.refeicaoIconHeader}>
                      <Coffee size={20} color="#b45309" />
                      <h4 style={styles.refeicaoNome}>Lanche da Manhã</h4>
                    </div>
                    <p style={styles.refeicaoTexto}>{cardapioDoDia.m || "Nenhum prato cadastrado para este período."}</p>
                  </div>

                  {/* ALMOÇO */}
                  <div style={styles.itemRefeicaoDestaque}>
                    <div style={styles.refeicaoIconHeader}>
                      <Utensils size={22} color="#15803d" />
                      <h4 style={{...styles.refeicaoNome, color: '#15803d'}}>Almoço Principal</h4>
                    </div>
                    <p style={styles.refeicaoTextoDestaque}>{cardapioDoDia.a || "Nenhum prato cadastrado para este período."}</p>
                  </div>

                  {/* LANCHE DA TARDE */}
                  <div style={styles.itemRefeicao}>
                    <div style={styles.refeicaoIconHeader}>
                      <Coffee size={20} color="#b45309" />
                      <h4 style={styles.refeicaoNome}>Lanche da Tarde</h4>
                    </div>
                    <p style={styles.refeicaoTexto}>{cardapioDoDia.t || "Nenhum prato cadastrado para este período."}</p>
                  </div>

                  {/* JANTAR / EJA */}
                  <div style={styles.itemRefeicao}>
                    <div style={styles.refeicaoIconHeader}>
                      <Moon size={20} color="#1e3a8a" />
                      <h4 style={styles.refeicaoNome}>Noturno / EJA</h4>
                    </div>
                    {/* Se o campo EJA não existir separadamente no script, mapeamos para repetir o prato principal 'a' */}
                    <p style={styles.refeicaoTexto}>{cardapioDoDia.a || "Mesmo cardápio do almoço ou não informado."}</p>
                  </div>

                  {/* OBSERVAÇÕES */}
                  {cardapioDoDia.o && (
                    <div style={styles.containerObs}>
                      <Info size={16} color="#0284c7" />
                      <p style={styles.textoObs}><strong>Nota:</strong> {cardapioDoDia.o}</p>
                    </div>
                  )}

                </div>
              )

            ) : (
              <p style={styles.loadingText}>Nenhum registro encontrado para este dia no banco de dados.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// OBJETO DE ESTILOS CSS-IN-JS
const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '24px', fontFamily: 'system-ui, sans-serif', color: '#1e293b', backgroundColor: '#f8fafc', minHeight: '100vh' },
  header: { borderBottom: '2px solid #e2e8f0', paddingBottom: '16px', marginBottom: '24px' },
  titulo: { fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
  subtitulo: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' },
  dashboardGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' },
  colunaEsquerda: { display: 'flex', flexDirection: 'column', gap: '20px' },
  colunaDireita: { display: 'flex', flexDirection: 'column' },
  cardClima: { backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' },
  cardClimaHeader: { display: 'flex', alignItems: 'center', gap: '10px' },
  cardClimaTitulo: { fontSize: '16px', fontWeight: 'bold', color: '#0369a1', margin: 0 },
  cardClimaTexto: { fontSize: '13px', color: '#0c4a6e', margin: 0, lineHeight: '1.5' },
  botaoClima: { display: 'inline-block', alignSelf: 'flex-start', backgroundColor: '#0284c7', color: '#fff', textDecoration: 'none', padding: '10px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', transition: 'background 0.2s' },
  cardCalendario: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' },
  cardHeaderGeneric: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' },
  genericTitulo: { fontSize: '15px', fontWeight: '600', margin: 0 },
  gradeBotoes: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' },
  botaoDia: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' },
  cardRefeicoes: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', flex: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
  refeicaoMainTitle: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px', margin: '0 0 20px 0' },
  loadingText: { color: '#64748b', fontStyle: 'italic', fontSize: '14px' },
  listaRefeicoes: { display: 'flex', flexDirection: 'column', gap: '16px' },
  itemRefeicao: { backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: '8px', padding: '14px' },
  itemRefeicaoDestaque: { backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', padding: '16px' },
  refeicaoIconHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' },
  refeicaoNome: { fontSize: '14px', fontWeight: '700', color: '#475569', margin: 0 },
  refeicaoTexto: { fontSize: '14px', color: '#334155', margin: 0, lineHeight: '1.4' },
  refeicaoTextoDestaque: { fontSize: '15px', color: '#166534', margin: 0, fontWeight: '500', lineHeight: '1.5' },
  containerObs: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0f9ff', padding: '10px', borderRadius: '6px', marginTop: '10px' },
  textoObs: { fontSize: '12px', color: '#0369a1', margin: 0 },
  containerFeriado: { textAlign: 'center', padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' },
  tituloFeriado: { fontSize: '18px', fontWeight: 'bold', color: '#991b1b', margin: 0 },
  subFeriado: { fontSize: '14px', color: '#7f1d1d', margin: 0 }
};