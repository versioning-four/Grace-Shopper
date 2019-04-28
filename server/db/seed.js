const { Order, LineItem, Review, User, Product } = require('./models')
const db = require('./db')

const syncAndSeed = () => {

    return db.authenticate()
    .then(() => db.sync({force: true}))
    .then(() => {
        //EVERYVODY CREATE SEED DATA

    })
}

module.export = syncAndSeed