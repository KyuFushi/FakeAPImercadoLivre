type Product = {
  id: string
  nome: string
  preco: number
}

type Sale = {
  id: string
  produtoId: string
  produto: string
  quantidade: number
  valor: number
  data: string
}

const produtos: Product[] = [
  {
    id: "MLB001",
    nome: "Notebook Gamer",
    preco: 4599
  },

  {
    id: "MLB002",
    nome: "Monitor 27",
    preco: 1899
  },

  {
    id: "MLB003",
    nome: "Mouse RGB",
    preco: 149
  },

  {
    id: "MLB004",
    nome: "Teclado Mecânico",
    preco: 329
  },

  {
    id: "MLB005",
    nome: "Headset",
    preco: 499
  }
]

const vendas: Sale[] = []

function gerarHistorico30Dias() {
  if (vendas.length > 0) return

  const agora = Date.now()

  for (let dia = 30; dia >= 0; dia--) {
    const qtdVendas =
      Math.floor(Math.random() * 40) + 20

    for (let i = 0; i < qtdVendas; i++) {
      const produto =
        produtos[
          Math.floor(
            Math.random() *
              produtos.length
          )
        ]

      const quantidade =
        Math.floor(
          Math.random() * 5
        ) + 1

      vendas.push({
        id:
          "SALE-" +
          Math.random()
            .toString(36)
            .slice(2),

        produtoId: produto.id,

        produto: produto.nome,

        quantidade,

        valor:
          produto.preco *
          quantidade,

        data: new Date(
          agora -
            dia *
              86400000 +
            Math.random() *
              86400000
        ).toISOString()
      })
    }
  }
}

function gerarVendaTempoReal() {
  const produto =
    produtos[
      Math.floor(
        Math.random() *
          produtos.length
      )
    ]

  vendas.unshift({
    id:
      "LIVE-" +
      Date.now(),

    produtoId: produto.id,

    produto: produto.nome,

    quantidade:
      Math.floor(
        Math.random() * 3
      ) + 1,

    valor:
      produto.preco *
      (Math.floor(
        Math.random() * 3
      ) + 1),

    data:
      new Date().toISOString()
  })

  if (vendas.length > 3000) {
    vendas.pop()
  }
}

gerarHistorico30Dias()

setInterval(
  gerarVendaTempoReal,
  10000
)

export function dashboard() {
  const total =
    vendas.reduce(
      (a, b) =>
        a + b.valor,
      0
    )

  return {
    metricas: {
      vendas:
        vendas.length,

      faturamento:
        Number(
          total.toFixed(2)
        ),

      ticketMedio:
        Number(
          (
            total /
            vendas.length
          ).toFixed(2)
        ),

      periodo:
        "30 dias"
    },

    produtos,

    ultimasVendas:
      vendas.slice(0, 30),

    atualizadoEm:
      new Date().toISOString()
  }
}