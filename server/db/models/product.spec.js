const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  let marcy
  beforeEach(async () => {
    marcy = await Product.create({
      title: '',
      imgUrl: marcy.jpg,
      price: '200.00',
      quantity: 3,
      category: ['cat']
    })
  })
  it('returns false if product has empty title')
  expect()
})
