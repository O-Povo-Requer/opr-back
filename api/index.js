const express = require('express')
const routesUser = require('./modules/User/routes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(routesUser)

app.listen(3333)
