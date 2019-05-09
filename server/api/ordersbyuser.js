const router = require('express').Router()
const { Order } = require('../db/models/index')
module.exports = router

router.get('/cart', (req, res, next) => {
  Order.findOne({
    where: {
      status: 'cart',
      userId: req.userId
    }
  })
    .then(order => res.json(order))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

router.get('/', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.userId
    }
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next)
})
