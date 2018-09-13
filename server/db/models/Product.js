const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    isNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    defaultValue: 'marcy.jpg'
  },
  price: {
    type: Sequelize.FLOAT,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

Product.findByCategory = function(category) {
  return Product.findAll({
    where: {
      category: {
        [Sequelize.Op.eq]: category
      }
    }
  })
}

module.exports = Product
