const Sequelize = require('sequelize');
const db = require('../db')

module.exports = db.define('previous_orders', {
    order_status: {
        type: Sequelize.STRING,
        defaultValue: 'In Process'
    },
    shipped_date: {
        type: Sequelize.STRING,
        defaultValue: 'Skill Not Yet Shipped'
    }
})