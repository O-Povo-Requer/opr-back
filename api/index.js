const express = require('express')
const routesCidadao = require('./modules/Cidadao/routes')
const requerimentoRoutes = require('./modules/Requerimento/routes')
const routesLegislador = require('./modules/Legislador/routes')
const routesCompartilhamento = require('./modules/Compartilhar/routes')
const routeLogin = require('./modules/ProcessarLogin/routes')
const routesComentario = require('./modules/Comentario/routes')
const routeCurtida = require('./modules/Curtida/routes')

const cors = require('cors')
const { use } = require('chai')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routesCidadao)
app.use(requerimentoRoutes)
app.use(routesLegislador)
app.use(routesCompartilhamento)
app.use(routesComentario)
app.use(routeLogin)
app.use(routeCurtida)

app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
