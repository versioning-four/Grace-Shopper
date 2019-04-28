const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
})

module.exports = Order
