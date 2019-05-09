const router = require('express').Router()
const { Order } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next)
})

router.get('/in-progress', (req, res, next) => {
  Order.findAll({
    where: {
      status: 'in-progress'
    }
  })
    .then(orders => res.json(orders))
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
