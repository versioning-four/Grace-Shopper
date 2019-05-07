const router = require('express').Router()
const { Order } = require('../db/models/index')
module.exports = router

router.post('/', (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: 'cart',
      userId: req.userId
    },
    default: req.body
  })
    .then(order => res.json(order[0]))
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
