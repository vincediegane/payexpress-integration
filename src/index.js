const express = require('express')
const app = express()
const ipn = require('./ipn')
const ask = require('./ask')
const pageIndex = require('./pageIndex')
const path = require('path')

// application config
app.use(express.static(path.resolve(__dirname, '../public')))
app.use(express.json())
app.set('views', path.resolve(__dirname, '../views'))
app.set('view engine', 'pug')

// payment with redirect
// payment without redirect
app.post('/ipn', ipn)
app.post('/ask', ask)
app.get('/', pageIndex)


// error middleware as last fallback
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})


//
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}.`)
})