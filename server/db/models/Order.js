const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('pending', 'completed'),
    defaultValue: 'pending'
  }
})

module.exports = Order
