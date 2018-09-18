const router = require('express').Router()
const {orders} = require('../db/models')

module.exports = router

router.get('/users/orders/:userId', async (req, res, next) => {
  try {
    const userOrders = await orders.findAll({
      where: {userId: req.params.userId}
    })
    res.json(userOrders)
  } catch (err) {
    next(err)
  }
})
