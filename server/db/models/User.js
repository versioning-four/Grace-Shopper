const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    firstName: {
        type: Sequelize.STRING
    },

    lastName: {
        type: Sequelize.STRING
    },

    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    password: {
        type: Sequelize.STRING
    }
})

module.exports = User
