const { Order, LineItem, Review, User, Product, Category } = require('./models')
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
      return createdSeedInstances(User, [
        {
          firstName: 'John',
          lastName: 'Smith',
          email: 'johnsmith@aol.com',
          isAdmin: false,
          password: '12345'
        },
        {
          firstName: 'Jes',
          lastName: 'sica',
          email: 'jessica@aol.com',
          isAdmin: false,
          password: '98765'
        },
        {
          firstName: 'James',
          lastName: 'Earl',
          email: 'jamesearl@aol.com',
          isAdmin: true,
          password: 'james'
        },
        {
          firstName: 'Jasmine',
          lastName: 'Jazz',
          email: 'jasminejazz@aol.com',
          isAdmin: false,
          password: 'jazzy123'
        },
        {
          firstName: 'Johnny',
          lastName: 'Boy',
          email: 'johnnyboy@aol.com',
          isAdmin: false,
          password: 'boywonder'
        }
      ])
    })
    .then(()=> {
      //CREATE CATEGORY DATA
      return createdSeedInstances(Category, [
        { id: 1, name: 'Big' },
        { id: 2, name: 'Farming Stuff' },
        { id: 3, name: 'Multipacks' },
        { id: 4, name: 'Bird Accessories' }
      ])
    })
    .then(() => {
      //CREATE PRODUCT DATA
      return createdSeedInstances(Product, [
        {
          name: 'Vibrant Green Tractor',
          description:
            'Make all of your neighbors jealous when they see you cruising through your cornfields on this heavy duty tractor. Price includes 2-year warranty.',
          price: 2500.0,
          inventoryQuantity: 1,
          categoryId: 1,
          image:
            'https://images.pexels.com/photos/327378/pexels-photo-327378.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        },
        {
          name: 'Four Prong Pitchfork',
          description:
            'Start a mob or a fire with this premium forged steel pitchfork.',
          price: 25.0,
          inventoryQuantity: 2,
          categoryId: 2,
          image:
            'https://images.unsplash.com/photo-1553217420-88b3b61aa2e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
        },
        {
          name: 'Cornish Cross Broiler Chicks (12 count)',
          description:
            'Deal of a lifetime: you get not one, not two, but one doxen Cornish Cross Broiler Chicks (the breed of chicken that changed our dinner habits) for our unbeatable price.',
          price: 35.0,
          inventoryQuantity: 12,
          categoryId: 3,
          image:
            'https://images.pexels.com/photos/583677/pexels-photo-583677.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        },
        {
          name: 'Rustic Wooden Birdhouse',
          description:
            'Perfect for your covered front porch, entryway or kitchen, this charming galvanized birdhouse says "welcome to the coop" to everyone who crosses it.',
          price: 705.0,
          inventoryQuantity: 5,
          categoryId: 4,
          image:
            'https://images.pexels.com/photos/150282/pexels-photo-150282.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        },
        {
          name: 'Hay',
          description:
            'Quality hay is importamt to the upkeep of your farm and we are here to provide it for you!',
          price: 215.0,
          inventoryQuantity: 200,
          categoryId: 2,
          image:
            'https://images.pexels.com/photos/126588/pexels-photo-126588.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
        }
      ])
    })
    .then(() => {
      //CREATE ORDER DATA
      return createdSeedInstances(Order, [
        { userId: 1 },
        { userId: 2 },
        { userId: null },
        { userId: 4 },
        { userId: 4 }
      ])
    })
    .then(() => {
      //CREATE LINEITEM DATA
      return createdSeedInstances(LineItem, [
        { quantity: 0, orderId: 2, productId: 5 },
        { quantity: 70, orderId: 4, productId: 1 },
        { quantity: 6, orderId: 3, productId: 1 },
        { quantity: 15, orderId: 5, productId: 3 },
        { quantity: 2, orderId: 5, productId: 3 }
      ])
    })
    .then(() => {
      //CREATE REVIEW DATA
      return createdSeedInstances(Review, [
        {
          title: `A real let down.`,
          content:
            'Poor at starting fires. Poor at attracting/creating angry mobs. Will not buy again.',
          rating: 1,
          userId: 1,
          productId: 2
        },
        {
          title: `They're Fantastoc!!!`,
          content: `These are the best Cornish Cross Broiler Chicks I've ever had! And I know good Cornish Cross Broiler Chicks!`,
          rating: 5,
          userId: 1,
          productId: 3
        },
        {
          title: `Doubt I'll buy again`,
          content: `I was really hoping to achieve so much with this pitchfork and it really didn't work out the way I had hoped. Disappointing to say the least.`,
          rating: 3,
          userId: 2,
          productId: 2
        },
        {
          title: 'Oh wow! V good!',
          content:
            'So vibrant. So fast. Every local rival farmer is as green as this tractor with envy.',
          rating: 5,
          userId: 4,
          productId: 1
        },
        {
          title: 'Some Ups and Some Downs',
          content:
            'This birdhouse certainly attracts a large amount of birds but the rustic wood is quickly damaged when large gangs of birds arrive.',
          rating: 4,
          userId: 5,
          productId: 4
        }
      ])
    })
}

module.exports = syncAndSeed
