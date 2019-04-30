const router = require('express').Router()
const { LineItem } = require('../db/models')

module.exports = router

router.get('/', (req, res, next) => {
  LineItem.findAll()
    .then(lineitems => res.json(lineitems))
    .catch(next)
})

router.post('/', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineitem => res.json(lineitem))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  LineItem.findByPk(req.params.id)
    .then(lineitem => lineitem.update(req.body))
    .then(lineitem => res.json(lineitem))
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  LineItem.destroy({ where: { id: req.params.id } })
    .then(() => res.sendStatus(204))
    .catch(next)
})
