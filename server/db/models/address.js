const Sequelize = require('sequelize');
const db = require('../db')

const Address = db.define('address', {
    street: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,  
        }
    }, 
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true  
        }
    }, 
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, 
            isIn: [['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MH', 'MA', 'MI', 'FM', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'VI', 'WA', 'WV', 'WI', 'WY']] 
        }
    }, 
    
    zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,  
        }
    }
});

module.exports = Address;