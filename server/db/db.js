const sequelize = require('sequelize')

const db = new sequelize(process.env.DATABASE_URL || 'postgres://localhost/grace_shopper_db', { logging: false })

module.exports = db