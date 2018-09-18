const router = require('express').Router()

const {Product, Reviews, User, Category} = require('../db/models')
//const {isLoggedIn} = require('../?)

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/category', async (req, res, next) => {
  try {
    const category = await Category.findAll()
    res.json(category)
  } catch (err) {
    next(err)
  }
})

router.get('/category/:category', async (req, res, next) => {
  try {
    const category = await Category.findOne({
      where: {
        title: req.params.category
      }
    })
    const categoryProducts = await category.getProductsByCat()
    res.json(categoryProducts)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  const reqProductId = Number(req.params.productId)
  try {
    const product = await Product.findAll({
      where: {
        id: reqProductId
      },
      include: [{model: Reviews}]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

router.get('/:productId/reviews', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId)
    const reviewsByProduct = await Reviews.findAll({
      where: {
        productId: productId
      },
      include: [{model: User}]
    })
    res.json(reviewsByProduct)
  } catch (error) {
    next(error)
  }
})


router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

// router.post('/:productId/reviews', /*isLoggedI*/ async (req, res, next)=> {
//   try{
//       const newReview = await Reviews.create(req.body)
//       res.json(newReview)
//   }catch (error){
//     next(error)
//   }
// })

router.post("/:productId/reviews", /*isLoggedIn,*/ async (req, res, next) => {
  let productForReview = await Product.findById(req.params.productId)
    try{
      if (!productForReview) {
        res.sendStatus(404);
      } else {
        let review = req.body;
        let incomingReview = await Reviews.create(review)
        res.json(incomingReview)
      }
    }catch(error) {
      next(error)
    }
});

router.put('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId
    const updates = req.body
    const updatedProduct = await Product.update(updates, {
      where: {id},
      returning: true,
      plain: true
    })
    res.status(204).json(updatedProduct[1])
  } catch (error) {
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
  } catch (error) {
    next(error)
  }
})
