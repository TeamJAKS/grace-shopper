const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      res.status(404).send('Not Found')
    } else {
      res.json(product)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:category', async (req, res, next) => {
  try {
    const category = await Product.findAll({
      where: {category: req.params.category}
    })
    if (!category) {
      res.status(404).send('Not Found')
    } else {
      res.json(category)
    }
  } catch (err) {
    next(err)
  }
})
