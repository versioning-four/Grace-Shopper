const express = require('express')
const app = express()
const path = require('path')
const syncAndSeed = require('./db/seed')
const volleyball = require('volleyball')
const session = require('express-session')

const port = process.env.PORT || 3000

app.use(
  session({
    secret: 'our website can definitely be hacked',
    resave: false,
    saveUninitialized: false
  })
)
app.use(express.json())
app.use(volleyball)

app.use(
  '/api/users/:userId/orders/:orderId/lineitems',
  (req, res, next) => {
    req.userId = req.params.userId
    req.orderId = req.params.orderId
    next()
  },
  require('./api/lineitemsbyuserandorder')
)
app.use(
  '/api/users/:userId/orders/',
  (req, res, next) => {
    req.userId = req.params.userId
    next()
  },
  require('./api/ordersbyuser')
)
app.use('/api/users', require('./api/User'))
app.use('/api/products', require('./api/Product'))
app.use('/api/orders', require('./api/Order'))
app.use('/api/lineitems', require('./api/LineItem'))
app.use('/api/reviews', require('./api/Review'))
app.use('/api/categories', require('./api/Category'))
app.use('/api/auth', require('./api/auth'))

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'dist', 'main.js'))
)

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
)

//error handling
app.use((error, req, res, next) => {
  let errors
  if (error.errors) {
    errors = error.errors.map(err => err.message)
  } else if (error.original) {
    errors = [error.original.message]
  } else {
    errors = [error.message]
  }

  console.error(errors)
  res.status(error.status || 500).send({ errors })
})

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
)

module.exports = app
