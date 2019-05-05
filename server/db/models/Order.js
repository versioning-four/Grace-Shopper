const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('cart', 'completed'),
    defaultValue: 'cart'
  }
})

module.exports = Order
