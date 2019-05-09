const router = require('express').Router()
const { LineItem } = require('../db/models/index')
module.exports = router

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineitem => res.json(lineitem))
    .catch(next)
})

router.get('/', (req, res, next) => {
  LineItem.findAll({
    where: {
      orderId: req.orderId
    }
  })
    .then(lineitems => res.json(lineitems))
    .catch(next)
})

router.put('/:lineitemid', (req, res, next) => {
  LineItem.findByPk(req.params.lineitemid)
    .then(lineitem => lineitem.update(req.body))
    .then(lineitem => res.json(lineitem))
    .catch(next)
})

router.delete('/:lineitemid', (req, res, next) => {
  LineItem.destroy({
    where: {
      id: req.params.lineitemid
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.orderId
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})
