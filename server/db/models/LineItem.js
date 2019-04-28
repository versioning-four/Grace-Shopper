const db = require('../db')
const Sequelize = require('sequelize')

const LineItem = db.define('lineitem', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 0
    }
  },
  orderid: {
    type: Sequelize.INTEGER
  }
})

module.exports = LineItem
