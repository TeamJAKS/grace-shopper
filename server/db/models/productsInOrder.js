const Sequelize = require('sequelize')
const db = require('../db')

module.exports = db.define('productsInOrder', {
  quantity: {
    type: Sequelize.INTEGER
  }
})
