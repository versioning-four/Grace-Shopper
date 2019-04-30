const router = require('express').Router()
const { Product } = require('../db/models/index')

module.exports = router

router.get('/', (req, res, next) => {
    Product.findAll()
        .then(products => res.json(products))
        .catch(next)
})

router.get('/:id', (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => res.json(product))
        .catch(next)
})

router.post('/', (req, res, next) => {
    Product.create(req.body)
        .then(product => res.json(product))
        .catch(next)
})

router.put('/:id', (req, res, next) => {
    Product.findByPk(req.params.id)
        .then(product => product.update(req.body))
        .then(product => res.json(product))
        .catch(next)

})

router.delete('/:id', (req, res, next) => {
    Product.destroy({
            where: {
                id: req.params.id
            }
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
