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
      createdSeedInstances(User, [
        { firstName: 'John', lastName: 'Smith', email: 'johnsmith@aol.com', isAdmin: false, password: '12345' },
        { firstName: 'Jes', lastName: 'sica', email: 'jessica@aol.com', isAdmin: false, password: '98765' },
        { firstName: 'James', lastName: 'Earl', email: 'jamesearl@aol.com', isAdmin: true, password: 'james' },
        { firstName: 'Jasmine', lastName: 'Jazz', email: 'jasminejazz@aol.com', isAdmin: false, password: 'jazzy123' },
        { firstName: 'Johnny', lastName: 'Boy', email: 'johnnyboy@aol.com', isAdmin: false, password: 'boywonder' }
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
      createdSeedInstances(Product, [
        { name: 'Vibrant Green Tractor', description: 'Make all of your neighbors jealous when they see you cruising through your cornfields on this heavy duty tractor. Price includes 2-year warranty.', price: 2500.00, inventoryQuantity: 1, image: 'https://images.pexels.com/photos/327378/pexels-photo-327378.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' },
        { name: 'Four Prong Pitchfork', description: 'Start a mob or a fire with this premium forged steel pitchfork.', price: 25.00, inventoryQuantity: 2, image: 'https://images.unsplash.com/photo-1553217420-88b3b61aa2e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80' },
        { name: 'Cornish Cross Broiler Chicks (12 count)', description: 'Deal of a lifetime: you get not one, not two, but one doxen Cornish Cross Broiler Chicks (the breed of chicken that changed our dinner habits) for our unbeatable price.', price: 35.00, inventoryQuantity: 12, image: 'https://images.pexels.com/photos/583677/pexels-photo-583677.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' },
        { name: 'Rustic Wooden Birdhouse', description: 'Perfect for your covered front porch, entryway or kitchen, this charming galvanized birdhouse says "welcome to the coop" to everyone who crosses it.', price: 705.00, inventoryQuantity: 5, image: 'https://images.pexels.com/photos/150282/pexels-photo-150282.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' },
        { name: 'Hay', description: 'Quality hay is importamt to the upkeep of your farm and we are here to provide it for you!', price: 215.00, inventoryQuantity: 200, image: 'https://images.pexels.com/photos/126588/pexels-photo-126588.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }
      ])
    })
}

module.exports = syncAndSeed
