const User = require('./User')
const Product = require('./Product')
const LineItem = require('./LineItem')
const Order = require('./Order')
const Review = require('./Review')
const Category = require('./Category')


User.hasMany(Order)
Order.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Order.hasMany(LineItem)
LineItem.belongsTo(Order)

Product.hasMany(LineItem)
LineItem.belongsTo(Product)

Product.hasMany(Review)
Review.belongsTo(Product)

Category.hasMany(Product)
Product.belongsTo(Category)

module.exports = {
  User,
  Product,
  Order,
  LineItem,
  Review,
  Category
}
