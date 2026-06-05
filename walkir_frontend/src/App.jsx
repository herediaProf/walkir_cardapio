import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // Estados do Aplicativo
  const [itensCardapio, setItensCardapio] = useState([])
  const [carrinho, setCarrinho] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // URL da sua API Django que configuramos na Cloudflare/Railway
  const API_URL = 'https://api.alphaomegainfo.ong.br/api/cardapio/' 
  // Número de WhatsApp do Walkir (substitua pelo número real com DDD, sem espaços)
  const WHATSAPP_NUMERO = '5511999999999' 

  // Buscar dados do Backend Django quando a tela carregar
  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Não foi possível carregar o cardápio.')
        }
        return response.json()
      })
      .then((data) => {
        setItensCardapio(data)
        setCarregando(false)
      })
      .catch((err) => {
        setErro(err.message)
        setCarregando(false)
        
        // MOCKUP TEMPORÁRIO: Caso sua API ainda não tenha dados, 
        // inserimos esses itens de teste para o site não ficar em branco
        setItensCardapio([
          { id: 1, nome: 'Hambúrguer Artesanal', descricao: 'Pão brioche, blend 150g, queijo cheddar e maionese da casa.', preco: 28.90 },
          { id: 2, nome: 'Batata Frita Especial', descricao: 'Batata rústica frita acompanhada de bacon crocante e cheddar.', preco: 18.00 },
          { id: 3, nome: 'Refrigerante Lata', descricao: 'Coca-cola, Guaraná ou Fanta 350ml.', preco: 6.00 }
        ])
      })
  }, [])

  // Função para adicionar item ao carrinho
  const adicionarAoCarrinho = (produto) => {
    setCarrinho((itensAtuais) => {
      const itemExiste = itensAtuais.find((item) => item.id === produto.id)
      if (itemExiste) {
        return itensAtuais.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      }
      return [...itensAtuais, { ...produto, quantidade: 1 }]
    })
  }

  // Função para remover ou diminuir item do carrinho
  const removerDoCarrinho = (id) => {
    setCarrinho((itensAtuais) => {
      const item = itensAtuais.find((i) => i.id === id)
      if (item.quantidade === 1) {
        return itensAtuais.filter((i) => i.id !== id)
      }
      return itensAtuais.map((i) =>
        i.id === id ? { ...i, quantidade: i.quantidade - 1 } : i
      )
    })
  }

  // Calcular valor total do carrinho
  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0)

  // Enviar pedido formatado para o WhatsApp do Walkir
  const finalizarPedidoWhatsApp = () => {
    if (carrinho.length === 0) return

    let mensagem = `*Novo Pedido - Cardápio Digital* 🍔\n\n`
    carrinho.forEach((item) => {
      mensagem += `${item.quantidade}x ${item.nome} - R$ ${(item.preco * item.quantidade).toFixed(2)}\n`
    })
    mensagem += `\n*Total: R$ ${totalCarrinho.toFixed(2)}*`
    
    const urlFormatada = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMERO}&text=${encodeURIComponent(mensagem)}`
    window.open(urlFormatada, '_blank')
  }

  return (
    <div className="cardapio-container">
      {/* Cabeçalho */}
      <header className="cardapio-header">
        <h1>Cardápio Digital</h1>
        <p>Seja bem-vindo! Faça o seu pedido abaixo.</p>
      </header>

      {/* Conteúdo Principal */}
      <main className="cardapio-main">
        <section className="produtos-section">
          <h2>Nossas Opções</h2>
          {carregando && <p className="status-txt">Carregando cardápio...</p>}
          {erro && <p className="status-txt erro">Nota: Carregando modo de demonstração ({erro})</p>}
          
          <div className="produtos-grid">
            {itensCardapio.map((produto) => (
              <div key={produto.id} className="produto-card">
                <h3>{produto.nome}</h3>
                <p>{produto.descricao}</p>
                <div className="produto-footer">
                  <span className="preco">R$ {Number(produto.preco).toFixed(2)}</span>
                  <button onClick={() => adicionarAoCarrinho(produto)}>
                    Adicionar +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lateral do Carrinho */}
        <aside className="carrinho-aside">
          <h2>Seu Carrinho</h2>
          {carrinho.length === 0 ? (
            <p className="carrinho-vazio">O carrinho está vazio.</p>
          ) : (
            <>
              <div className="carrinho-itens">
                {carrinho.map((item) => (
                  <div key={item.id} className="carrinho-item">
                    <div>
                      <h4>{item.nome}</h4>
                      <span>{item.quantidade}x - R$ {(item.preco * item.quantidade).toFixed(2)}</span>
                    </div>
                    <div className="carrinho-acoes">
                      <button onClick={() => removerDoCarrinho(item.id)}>-</button>
                      <button onClick={() => adicionarAoCarrinho(item)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="carrinho-total">
                <h3>Total: R$ {totalCarrinho.toFixed(2)}</h3>
                <button className="btn-finalizar" onClick={finalizarPedidoWhatsApp}>
                  Enviar Pedido via WhatsApp
                </button>
              </div>
            </>
          )}
        </aside>
      </main>
    </div>
  )
}

export default App