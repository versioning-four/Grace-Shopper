const router = require('express').Router()
const { LineItem } = require('../db/models/index')
module.exports = router

router.post('/', (req, res, next) => {
  if (req.session.userId) {
    LineItem.create(req.body)
      .then(lineitem => res.json(lineitem))
      .catch(next)
  } else {
    if (req.session.cart) {
      req.session.cart.push(req.body)
    } else {
      req.session.cart = [req.body]
    }
    console.log(req.session.cart)
    res.json(req.body)
  }
})

router.get('/', (req, res, next) => {
  if (req.session.userId) {
    LineItem.findAll({
      where: {
        orderId: req.orderId
      }
    })
      .then(lineitems => {
        if (req.session.cart && req.session.cart.length) {
          req.session.cart.forEach(async item => {
            let existingLineItem = lineitems.find(
              lineitem => lineitem.productId === item.productId
            )
            if (existingLineItem) {
              await LineItem.update(
                { quantity: existingLineItem.quantity + item.quantity },
                { where: { id: existingLineItem.id } }
              )
            } else {
              const newLineItem = await LineItem.create({
                orderId: req.orderId,
                productId: item.productId,
                quantity: item.quantity
              })
              lineitems.push(newLineItem)
            }
          })
        }
        return lineitems
      })
      .then(lineitems => res.json(lineitems))
      .catch(next)
  } else {
    req.session.cart = req.session.cart || []
    res.json(req.session.cart)
  }
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
