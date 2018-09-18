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
        console.log(updatedOrder)
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
    res.json(processOrder[1])

}catch (err) {
    next(err)
}
})