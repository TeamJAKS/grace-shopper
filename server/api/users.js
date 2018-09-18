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
    const address = await Address.findOne({
      where: {userId: req.params.userId}
    })
    res.json(address.dataValues)
  } catch (error) {
    next(error)
  }
})

router.put('/profile/:userId/edit', async (req, res, next) => {
  try {
    const id = req.params.userId
    const [num, updatedUser] = await User.update(
      {
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName
      },
      {
        where: {
          id: id
        },
        returning: true,
        plain: true
      }
    )
    res.status(204).send(updatedUser.dataValues)
  } catch (error) {
    next(error)
  }
})

router.put('/profile/:userId/edit/address', async (req, res, next) => {
  try {
    const id = req.params.userId
    const [num, updatedAddress] = await Address.update(
      {
        street: req.body.address.street,
        city: req.body.address.city,
        state: req.body.address.state,
        zipCode: req.body.address.zipCode
      },
      {
        where: {
          userId: id
        },
        returning: true,
        plain: true
      }
    )
    res.status(204).send(updatedAddress.dataValues)
  } catch (error) {
    next(error)
  }
})
