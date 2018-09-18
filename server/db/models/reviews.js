const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./Product')

module.exports = db.define('reviews', {
    title: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    text: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
                notEmpty: true 
        }
    },
    stars: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 5
        }
    }
// }, {
//   defaultScope: {
//     include: [
//       { model: Product}
//     ]
//   } Keyairra is using this to test the add review routes
})