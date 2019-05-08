const router = require('express').Router()
const { Category, Product } = require('../db/models')

module.exports = router

router.get('/', (req, res, next)=> {
  Category.findAll({ include: [ Product ]})
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:id', (req, res, next)=> {
  Category.findByPk(req.params.id, { include: [ Product ]})
    .then(category => res.json(category))
    .catch(next)
})

router.post('/', (req, res, next)=> {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next)
})

router.put('/:id', (req, res, next)=> {
  Category.findByPk(req.params.id)
    .then(category => category.update(req.body))
    .then(category => res.json(category))
    .catch(next)
})

router.delete('/', (req, res, next)=> {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next)
})