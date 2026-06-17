import express from "express"
import cors from "cors"

import { dashboard } from "./mockData"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/dashboard", (_, res) => {
  res.json(dashboard())
})

app.get("/openapi.json", (_, res) => {
  res.json({
    openapi: "3.0.3",

    info: {
      title: "Fake Mercado Livre API",
      version: "1.0.0"
    },

    servers: [
      {
        url:
          "https://redesigned-waffle-p7j5q6g79pjjcr5vp-3001.app.github.dev"
      }
    ],

    paths: {
      "/dashboard": {
        get: {
          summary:
            "Obter dashboard",

          operationId:
            "getDashboard",

          responses: {
            "200": {
              description:
                "Resposta dashboard",

              content: {
                "application/json": {
                  schema: {
                    "$ref":
                      "#/components/schemas/Dashboard"
                  }
                }
              }
            }
          }
        }
      }
    },

    components: {
      schemas: {
        Dashboard: {
          type: "object",

          properties: {
            metricas: {
              type: "object",

              properties: {
                vendas: {
                  type:
                    "integer"
                },

                faturamento: {
                  type:
                    "number"
                },

                ticketMedio: {
                  type:
                    "number"
                },

                periodo: {
                  type:
                    "string"
                }
              }
            },

            produtos: {
              type:
                "array",

              items: {
                type:
                  "object"
              }
            },

            ultimasVendas: {
              type:
                "array",

              items: {
                type:
                  "object"
              }
            },

            atualizadoEm: {
              type:
                "string"
            }
          }
        }
      }
    }
  })
})

app.listen(3001, () => {
  console.log(
    "Servidor iniciado"
  )
})