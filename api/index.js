const express = require('express')
const routesCidadao = require('./modules/Cidadao/routes')
const routesLegislador = require('./modules/Legislador/routes')
const routesAtividade = require('./modules/Atividade/routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routesCidadao)
app.use(routesLegislador)
app.use(routesAtividade)

app.listen(3333)
