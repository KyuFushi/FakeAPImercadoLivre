import express from "express"
import cors from "cors"

import { dashboard } from "./mockData"

const app = express()

const PORT = Number(process.env.PORT || 3001)
const PUBLIC_BASE_URL =
  process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.json({ ok: true })
})

app.get("/dashboard", (_req, res) => {
  res.json(dashboard())
})

app.get("/openapi.json", (_req, res) => {
  res.json({
    openapi: "3.0.3",
    info: {
      title: "Fake Mercado Livre API",
      version: "1.0.0",
    },
    servers: [
      {
        url: PUBLIC_BASE_URL,
      },
    ],
    paths: {
      "/dashboard": {
        get: {
          summary: "Obter dashboard",
          operationId: "getDashboard",
          responses: {
            "200": {
              description: "Resposta dashboard",
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Dashboard",
                  },
                },
              },
            },
          },
        },
      },
    },
    components: {
      schemas: {
        Dashboard: {
          type: "object",
          properties: {
            metricas: {
              type: "object",
              properties: {
                vendas: { type: "integer" },
                faturamento: { type: "number" },
                ticketMedio: { type: "number" },
                periodo: { type: "string" },
              },
            },
            produtos: {
              type: "array",
              items: { type: "object" },
            },
            ultimasVendas: {
              type: "array",
              items: { type: "object" },
            },
            atualizadoEm: {
              type: "string",
            },
          },
        },
      },
    },
  })
})

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`)
})