const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'completed', 'in-progress'),
    defaultValue: 'cart'
  }
})

module.exports = Order
