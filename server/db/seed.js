const { Order, LineItem, Review, User, Product } = require('./models')
const db = require('./db')

const syncAndSeed = () => {
  return db
    .authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => {
      //CREATE USER DATA
      return Promise.all([
        User.create({ firstName: 'John', lastName: 'Smith', email: 'johnsmith@aol.com', isAdmin: false, password: '12345' }),
        User.create({ firstName: 'Jes', lastName: 'sica', email: 'jessica@aol.com', isAdmin: false, password: '98765' }),
        User.create({ firstName: 'James', lastName: 'Earl', email: 'jamesearl@aol.com', isAdmin: true, password: 'james' }),
        User.create({ firstName: 'Jasmine', lastName: 'Jazz', email: 'jasminejazz@aol.com', isAdmin: false, password: 'jazzy123' }),
        User.create({ firstName: 'Johnny', lastName: 'Boy', email: 'johnnyboy@aol.com', isAdmin: false, password: 'boywonder' }),

      ])
    })
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
      //CREATE PRODUCT DATA
    })
}

module.export = syncAndSeed
