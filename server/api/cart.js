const router = require('express').Router()
const {Product, User, Order} = require('../db/models')

module.exports = router;

router.post('/', async (req, res, next) => {
    const userId = Number(Object.keys(req.body)[0])
    try {
        const userCart = await Order.findOrCreate({
            where:{
                userId: userId,
                order_status: 'In Cart'
            },
            include: [{model: Product}]
        })
        res.json(userCart[0])
    }catch(err){
        next(err)
    }
})

router.put('/' , async (req, res, next) => {
    try {
        const orderId = req.body.orderId
        const order = await Order.findById(orderId)
        const updateOrder = await order.addProduct(req.body.productId)
        const updatedOrder = await Order.findAll({
            where: {
                id: orderId,
            },
            include: [{model: Product}]
        })
        res.json(updatedOrder[0])
    }catch(err){
        next(err)
    }
})

router.put('/checkout', async (req, res, next) => {
    try {
        const processOrder = await Order.update({
            order_status: 'Processing'
        }, {where: {id: req.body.id},
        returning: true,
        plain: true
    })
    const newOrder = await Order.create({
        userId: req.body.userId
    })
    res.json(newOrder)

}catch (err) {
    next(err)
    }
})

router.post('/checkout', async (req, res, next) => {
    try {
        const user = await User.create(req.body.formInput)
        const userId = user.id
        const newOrder = await Order.create({
            order_status: 'Processing',
            userId: userId
        })
        console.log('NEWORDER', newOrder)
        const newOrderWProducts = await newOrder.addProducts(req.body.cartItemsArr)
        res.json(newOrder)
    } catch (err) {
        next(err)
    }
})

router.put('/deleteItem', async (req, res, next) => {
    try {
        const orderId = req.body.orderId
        const order = await Order.findById(orderId)
        const updateOrder = await order.removeProduct(req.body.productId)
        const updatedOrder = await Order.findAll({
            where: {
                id: orderId,
            },
            include: [{model: Product}]
        })
        res.json(updatedOrder[0])
        }catch(err){
            next(err)
        }
})