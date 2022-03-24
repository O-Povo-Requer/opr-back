const express = require('express')
const routesCidadao = require('./modules/Cidadao/routes')
const routesRequerimento = require('./modules/Requerimento/routes')
const routesLegislador = require('./modules/Legislador/routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routesCidadao)
app.use(routesRequerimento)
app.use(routesLegislador)

app.listen(3333)
