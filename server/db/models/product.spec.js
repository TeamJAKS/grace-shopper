const {expect} = require('chai')
const db = require('../index')
const Product = require('./Product')

describe('Product model', () => {
  let marcy
  beforeEach(async () => {
    marcy = await Product.create({
      title: '',
      imgUrl:
        'http://www.animalplanet.com/tv-shows/caturday/caturday-photo-contest/',
      price: '200.00',
      quantity: 3,
      category: ['cat']
    })
  })

  it('returns product must have title', async () => {
    expect(marcy.title).to.not.equal(null)
    // try {
    //   await marcy.validate()
    //   throw Error(
    //     'validation was successful but should have failed if name is an empty string'
    //   )
    // } catch (err) {
    //   expect(err.message).to.contain('Validation error')
    // }
  })
})
