const User = require('./User')
const Address = require('./address')
const PreviousOrders = require('./PreviousOrders')
const Product = require('./Product')
const Cart = require('./cart')
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

 User.hasOne(Cart)
 Cart.belongsTo(User)

 User.hasMany(PreviousOrders)
 PreviousOrders.belongsTo(User)

 User.hasMany(Reviews)
 Reviews.belongsTo(User)

 Cart.belongsToMany(Product, {through: 'productsInCart'})
 Product.belongsToMany(Cart, {through: 'productsInCart'})

 PreviousOrders.hasOne(Address)
 Address.belongsTo(PreviousOrders)

 PreviousOrders.belongsToMany(Product, {through: 'productsInOrder'})
 Product.belongsToMany(PreviousOrders, {through: 'productsInOrder'})

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
  Address
}
