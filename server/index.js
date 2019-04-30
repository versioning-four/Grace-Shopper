const express = require('express')
const app = express()
const path = require('path')
const syncAndSeed = require('./db/seed')

const port = process.env.PORT || 3000

app.use(express.json())

app.use('/api/orders', require('./api/Order'))
app.use('/api/lineitems', require('./api/LineItem'))

app.get('/app.js', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'dist', 'main.js'))
)

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
)

app.use('/api/users', require('./api/User'))

syncAndSeed().then(() =>
  app.listen(port, () => console.log(`listening on port ${port}`))
)

module.exports = app