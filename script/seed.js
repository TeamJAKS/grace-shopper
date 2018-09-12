'use strict'

const db = require('../server/db')

const {User, Address, Product, Cart, Reviews} = require('../server/db/models')

const users = [{firstName: 'Jordan', lastName: 'Davis', email: 'jdavis@email.com', password: 'jordanCodes8910', adminStatus: true}, {firstName: 'Almendra', lastName: 'Estrada', email: 'AEstrada@email.com', password: 'irockmysocks1224', adminStatus: false}, {firstName: 'Keyairra', lastName: 'Wright', email: 'kwright@email.com', password: 'keyairrakeyairraaaa', adminStatus:  true}, {firstName: 'Stacy', lastName: 'Harfenist', email:'stacy@email.com', password: 'whatineedapassword?', adminStatus: false}]
const products = [{title: 'Cook a Duck', price: 45.50, imageUrl: 'n/a', description: 'Learn how to cook a duck in the french style.  Impress your friends and neighbors.  Even the neighbors who are not your friends.', category: 'Cooking', quantity:6}, {title: 'React Expertise', price: 500, imageUrl: 'n/a', description: 'Instantly become an expert at React.  Redux costs extra', category: 'Coding', quantity: 1}, {title: 'Intermediate Piano', price: 75.00, imageUrl: 'n/a', description: 'Tired of playing Heart & Soul? Up your piano skills to include Fur Elise, Elvin Dance, and the Spinning Song', category: 'Music', quantity:`12`}]
const addresses = [{street: '123 M Ave', city: 'Cityville', state: 'OK', zipCode: 12345, userId: 1}, {street: '345 Nancy Ave', city: 'Drewston', state: 'OH', zipCode: 44567, userId: 2}, {street: '54 Old Clock Way', city: 'Carson', state: 'NV', zipCode: 56123, userId: 3}, {street: '4 Nickerson Way', city: 'Emerson', state: 'MA', zipCode: 12345, userId: 4}, {street: '34 Fayne Way', city: 'Atlanta', state: 'GA', zipCode: 11245, userId: 4}, {street: '33 Bess Street', city: 'Marvinsville', state: 'TX', zipCode: 55342, userId: 3}, {street: '45 Hannah Ave', city: 'Gruen', state: 'IL', zipCode: 21376}, {street: '1 Circle Drive', city: 'River Heights', state: 'IL', zipCode: 31201}]
const reviews = [{title: 'great product', text: 'I love this product so much, it makes my heart soar and my eyes fill with tears of joy', stars: 4, userId: 1, productId: 1}, {title: 'eh', text: 'this was a nice skill, but it did not save my marriage', stars: 3, userId: 2, productId: 2}, {title: 'I think I ordered the wrong thing', text: 'I thought I was ordering a meal for delivery, but instead now I know how to cook it?? Very weird, but cool', stars: 5, userId: 2, productId: 3}, {title: 'Tres Bien!', text: 'I love this product! I feel so french!', stars: 5, userId: 3, productId: 1}]
 
function seed() {
 return Promise.all(users.map(user =>
    User.create(user)
    ))
    .then(() => 
    Promise.all(products.map(product =>
      Product.create(product)
    )))
      .then(() =>
    Promise.all(addresses.map(address => 
      Address.create(address)
      ))
      )
      .then(() => 
      Promise.all(reviews.map(review => 
        Reviews.create(review))))
    // .then(() => {
    // console.log('db synced!') 


}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  await db.sync({force:true}) // tables didn't drop (ie. when npm run seed occured, Carts model still existed and Order model was not updated)
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
