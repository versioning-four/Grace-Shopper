const User = require('./User')
const Product = require('./Product')
const LineItem = require('./LineItem')
const Order = require('./Order')
const Review = require('./Review')

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

module.exports = {
  User,
  Product,
  Order,
  LineItem,
  Review
}
