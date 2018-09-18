const User = require('./user')
const Product = require('./product')
const Address = require('./address')
const Order = require('./order')
const Reviews = require('./reviews')
const Category = require('./category')
const ProductsInOrder = require('./productsInOrder')

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

Order.belongsToMany(Product, {through: ProductsInOrder})
Product.belongsToMany(Order, {through: ProductsInOrder})

Product.hasMany(Reviews)
Reviews.belongsTo(Product)

Product.belongsToMany(Category, {through: 'productCategories'})
Category.belongsToMany(Product, {through: 'productCategories'})

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
  Reviews,
  Category,
  ProductsInOrder
}
