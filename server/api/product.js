const router = require('express').Router();
const {Product, Reviews} = require('../db/models');

module.exports = router

router.get('/', async (req, res, next) => {
    try {
      const products = await Product.findAll()
      res.json(products)
    } catch (err) {
      next(err)
    }
})


router.get('/:productId', async (req, res, next) => {
    const reqProductId = Number(req.params.productId)
    try {
        const product = await Product.findAll({
            where:{
                id: reqProductId
            },
            include: [{model: Reviews}]
        })
        res.json(product)
    } catch (error) {
        next(error)
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

router.post('/', async (req, res, next)=> {
    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error){
        next(error)
    }
})

router.put('/:productId', async (req, res, next) => {
    try {
        const id = req.params.productId;
        const updates = req.body
        const updatedProduct = await Product.update(updates, {
            where: {id},
            returning: true,
            plain: true
        })
        res.sendStatus(204).json(updatedProduct[1]).end()
    } catch (error){
        next(error)
    }
})

router.delete('/:productId', async (req, res, next) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.productId
            }
        })
    } catch (error){
        next(error)
    }
})

