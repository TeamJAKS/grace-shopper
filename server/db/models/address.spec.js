const {expect} = require('chai')
const db = require('../index')
const Address = db.model('address')

describe('Address model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('correctAddress', () => {
      let testAddress;

      beforeEach(async () => {
        testAddress = await Address.create({
          street: '123 Random Avenue',
          city: 'New York City',
          state: 'NY',
          zipCode: 10031 
        })
        
        it('returns true if the address is correct', () => {
            expect(testAddress.correctAddress()).to.be.equal(true)
          }) 

      })

  })
})
