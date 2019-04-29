const { Order, LineItem, Review, User, Product } = require('./models')
const db = require('./db')

const createdSeedInstances = (model, data) => {
  return Promise.all(data.map(instance => model.create(instance)))
}

const syncAndSeed = () => {
  return db
    .authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => {
      //CREATE USER DATA
      return Promise.all([
        User.create({
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith@aol.com',
          isAdmin: false,
          password: '12345'
        }),
        User.create({
          firstName: 'Jes',
          lastName: 'sica',
          email: 'jessica@aol.com',
          isAdmin: false,
          password: '98765'
        }),
        User.create({
          firstName: 'James',
          lastName: 'Earl',
          email: 'jamesearl@aol.com',
          isAdmin: true,
          password: 'james'
        }),
        User.create({
          firstName: 'Jasmine',
          lastName: 'Jazz',
          email: 'jasminejazz@aol.com',
          isAdmin: false,
          password: 'jazzy123'
        }),
        User.create({
          firstName: 'Johnny',
          lastName: 'Boy',
          email: 'johnnyboy@aol.com',
          isAdmin: false,
          password: 'boywonder'
        })
      ])
    })
    .then(() => {
      //CREATE ORDER DATA
      return createdSeedInstances(Order, [
        { userId: 1 },
        { userId: 2 },
        { userId: 2 },
        { userId: 4 },
        { userId: 4 }
      ])
    })
    .then(() => {
      //CREATE LINEITEM DATA
      return createdSeedInstances(LineItem, [
        { quantity: 0, orderId: 2 },
        { quantity: 70, orderId: 4 },
        { quantity: 6, orderId: 3 },
        { quantity: 15, orderId: 5 },
        { quantity: 2, orderId: 5 }
      ])
    })
    .then(() => {
      //CREATE REVIEW DATA
    })

    .then(() => {
      //CREATE PRODUCT DATA
    })
}

module.exports = syncAndSeed
