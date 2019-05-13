const router = require('express').Router()
const { Order, LineItem, User, Product } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/in-progress', (req, res, next) => {
  Order.findAll({
    where: { status: 'in-progress' },
    include: [
      {
        model: LineItem,
        include: [{ model: Product }]
      },
      { model: User }
    ]
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.put('/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.json(updatedOrder))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Order.create(req.body)
    .then(order => res.json(order))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  Order.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
