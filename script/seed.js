'use strict'

const db = require('../server/db')
const {Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const product = await Promise.all([
    Product.create({
      title: 'Cooking Lesson',
      imgUrl: 'marcy.img',
      price: 2.35,
      description: 'Cooking lesson description',
      quantity: '2',
      category: ['Cooking']
    }),
    Product.create({
      title: 'Coding Lesson',
      imgUrl: 'marcy.img',
      price: 4.65,
      description: 'Coding lesson description',
      quantity: '4',
      category: ['Coding']
    })
  ])

  console.log(`seeded ${product.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
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
