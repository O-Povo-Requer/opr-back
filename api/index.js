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

app.options("/*", function(req, res, next) {
    console.log('preflight request');
    res.header('Access-Control-Allow-Origin', 'https://opovorequer.netlify.app/');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(200);
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://opovorequer.netlify.app/');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    //intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
