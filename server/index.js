const express = require('express')
const app = express()
const path = require('path')
const syncAndSeed = require('./db/seed')
const volleyball = require('volleyball')
const session = require('express-session')
const lineitemsbyuserandorder = require('./api/lineitemsbyuserandorder')
const ordersbyuser = require('./api/ordersbyuser')
const user = require('./api/User')
const product = require('./api/Product')
const order = require('./api/Order')
const lineitem = require('./api/LineItem')
const review = require('./api/Review')
const category = require('./api/Category')
const auth = require('./api/auth')

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
  lineitemsbyuserandorder
)
app.use(
  '/api/users/:userId/orders/',
  (req, res, next) => {
    req.userId = req.params.userId
    next()
  },
  ordersbyuser
)
app.use('/api/users', user)
app.use('/api/products', product)
app.use('/api/orders', order)
app.use('/api/lineitems', lineitem)
app.use('/api/reviews', review)
app.use('/api/categories', category)
app.use('/api/auth', auth)

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
