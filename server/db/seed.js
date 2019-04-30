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
      //CREATE PRODUCT DATA
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
      createdSeedInstance(Review, [
        { title: `A real let down.`, content: 'Poor at starting fires. Poor at attracting/creating angry mobs. Will not buy again.', rating: 1, userId: 1, productId: 2},
        { title: `They're Fantastoc!!!`, content: `These are the best Cornish Cross Broiler Chicks I've ever had! And I know good Cornish Cross Broiler Chicks!`, rating: 5, userId: 1, productId: 3},
        { title: `Doubt I'll buy again`, content: `I was really hoping to achieve so much with this pitchfork and it really didn't work out the way I had hoped. Disappointing to say the least.`, rating: 3, userId: 2, productId: 2},
        { title: 'Oh wow! V good!', content: 'So vibrant. So fast. Every local rival farmer is as green as this tractor with envy.', rating: 5, userId: 4, productId: 1},
        { title: 'Some Ups and Some Downs', content: 'This birdhouse certainly attracts a large amount of birds but the rustic wood is quickly damaged when large gangs of birds arrive.', rating: 4, userId: 5, productId: 4}
      ])
    })
}

module.exports = syncAndSeed
