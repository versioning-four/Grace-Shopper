const { Order, LineItem, Review, User, Product } = require('./models')
const db = require('./db')

const syncAndSeed = () => {
  return db
    .authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => {
      //CREATE ORDER DATA
    })
    .then(() => {
      //CREATE LINEITEM DATA
    })
    .then(() => {
      //CREATE REVIEW DATA
    })
    .then(() => {
      //CREATE USER DATA
    })

    .then(() => {
      //CREATE PRODUCT DATA
    })
}

module.export = syncAndSeed
