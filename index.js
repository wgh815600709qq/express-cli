import express from 'express'
// import adminRouter from './router/admin'
import logsRouter from './router/logs'
const path = require('path')
// const session = require('express-session')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 8989
var bodyParser = require('body-parser') // Request header to parse middleware
var clientErrorHandler = require('./middleware/clientErrorHandler.js')
var errorHandler = require('./middleware/errorHandler.js')
var Interceptor = require('./middleware/Interceptor.js')
// var createNewSocket = require('./utils/socket')
app.set('port', port)
// app.use(express.static(path.resolve(__dirname, '../static'))) // Static resources
app.use(bodyParser.json({limit: '2048kb'})) // Request content is not not more than 2G
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(session({
//   secret: 'performance',
//   cookie: {maxAge: 60 * 1000 * 30} // Overdue time
// }))
// 设置跨域
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Ajax');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

app.use(Interceptor) // Router Interceptor
/*
*  Put routers in the block
*/
// app.use('/admin', adminRouter)
app.use('/logs', logsRouter)

// At last solve 404
// app.use('*', function(req, res) {
//   res.status(404).send({ error: 'Api Is Not Found!' })
// })

app.use(clientErrorHandler) // Client Error Solution
app.use(errorHandler) // Sever Error Solution
app.listen(port, host)// Listen the server


console.warn('Server Start on', new Date().toLocaleString())
console.log('Server listening on ' + host + ':' + port)
// createNewSocket()