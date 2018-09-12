const Sequelize = require('sequelize');
const db = require('../db')

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
})