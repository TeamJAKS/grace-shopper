const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('orders', {
    order_status: {
        type: Sequelize.STRING,
        defaultValue: 'In Cart',
        validate: {
            notEmpty: true, 
            isIn: [['In Cart', 'Processing', 'Complete']]
        }
    },
    shipped_date: {
        type: Sequelize.STRING,
        defaultValue: 'Skill Not Yet Shipped'
    }
})