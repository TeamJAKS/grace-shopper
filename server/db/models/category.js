const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  title: {
    type: Sequelize.STRING
  }
})

Category.prototype.getProductsByCat = function() {
  return this.getProducts()
}

module.exports = Category
