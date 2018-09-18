const router = require('express').Router()
const {User, Address} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/profile/:userId', async (req, res, next) => {
  try {
    const address = await Address.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(address)
  } catch (error) {
    next(error)
  }
})

router.put('/profile/:userId/edit/address', async (req, res, next) => {
  console.log('***', req.body)
  try {
    const id = req.params.userId
    const updates = req.body
    const updatedAddress = await Address.update(
      {
        street: updates.street,
        city: updates.city,
        state: updates.state,
        zipCode: updates.zip
      },
      {
        where: {
          userId: id
        },
        returning: true,
        plain: true
      }
    )
    console.log('UPD ADDRESS', updatedAddress)
    res.status(204).json(updatedAddress)
  } catch (error) {
    next(error)
  }
})

router.put('/profile/:userId/edit', async (req, res, next) => {
  try {
    const id = req.params.userId
    const updates = req.body
    const updatedUser = await User.update(updates, {
      where: {
        userId: id
      },
      returning: true,
      plain: true
    })
    res.status(204).json(updatedUser[1])
  } catch (error) {
    next(error)
  }
})
