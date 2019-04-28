const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'https://images.pexels.com/photos/58875/pexels-photo-58875.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  }
})

module.exports = Product
