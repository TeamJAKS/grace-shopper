
const User = require('./user')
const Product = require('./product')
const Address = require('./address')
const Order = require('./order')
const Reviews = require('./reviews')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 *
 */

 User.hasMany(Address)
 Address.belongsTo(User)

 User.hasMany(Order)
 Order.belongsTo(User)

 User.hasMany(Reviews)
 Reviews.belongsTo(User)

 Order.hasOne(Address)
 Address.belongsTo(Order)

 Order.belongsToMany(Product, {through: 'productsInOrder'})
 Product.belongsToMany(Order, {through: 'productsInOrder'})

 Product.hasMany(Reviews)
 Reviews.belongsTo(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Address,
  Order,
  Product,
  Reviews
}
