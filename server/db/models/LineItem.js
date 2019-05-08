const db = require('../db')
const Sequelize = require('sequelize')

const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: {
        args: [0],
        msg: 'quantity of item in order must be zero or greater'
      }
    }
  }
})

module.exports = LineItem
