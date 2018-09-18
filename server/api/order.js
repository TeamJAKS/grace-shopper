const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

router.get('/:userId', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {userId: req.params.userId},
      includes: [{model: Product}]
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})

// router.get('/', async (req, res, next) => {
//   try {
//     const userOrders = await Order.findAll()
//     res.json(userOrders)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      includes: [{model: Product}]
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})
