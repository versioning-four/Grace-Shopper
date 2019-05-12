/* eslint-disable complexity */
const router = require('express').Router()
const { LineItem } = require('../db/models/index')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    if (req.session.userId) {
      const lineitem = await LineItem.create(req.body)
      res.json(lineitem)
    } else {
      let newItem
      if (req.session.cart && req.session.cart.length) {
        newItem = {
          id: Math.max(...req.session.cart.map(item => item.id)) + 1,
          ...req.body
        }
        req.session.cart.push(newItem)
      } else {
        newItem = { id: 0, ...req.body }
        req.session.cart = [newItem]
      }
      res.json(newItem)
    }
    res.json(req.body)
  } catch (err) {
    next(err)
  }
})

router.get('/', async (req, res, next) => {
  try {
    if (req.session.userId) {
      const lineitems = await LineItem.findAll({
        where: {
          orderId: req.orderId
        }
      })
      if (req.session.cart && req.session.cart.length) {
        for (let i = 0; i < req.session.cart.length; ++i) {
          const item = req.session.cart[i]
          let existingLineItem = lineitems.find(
            lineitem => lineitem.productId === item.productId
          )
          if (existingLineItem) {
            const newQuantity =
              Number(existingLineItem.quantity) + Number(item.quantity)
            existingLineItem.quantity = newQuantity
            await LineItem.update(
              { quantity: newQuantity },
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
        }
      }
      res.json(lineitems)
    } else {
      req.session.cart = req.session.cart || []
      res.json(req.session.cart)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:lineitemid', async (req, res, next) => {
  try {
    if (req.session.userId) {
      const lineitem = await LineItem.findByPk(req.params.lineitemid)
      const updatedLineitem = await lineitem.update(req.body)
      res.json(updatedLineitem)
    } else {
      req.session.cart = req.session.cart.map(item =>
        item.id === Number(req.params.lineitemid) ? req.body : item
      )
      res.json(
        req.session.cart.find(item => item.id === Number(req.params.lineitemid))
      )
    }
  } catch (err) {
    next(err)
  }

  if (req.session.userId) {
    LineItem.findByPk(req.params.lineitemid)
      .then(lineitem => lineitem.update(req.body))
      .then(lineitem => res.json(lineitem))
      .catch(next)
  } else {
    req.session.cart = req.session.cart.map(item =>
      item.id === Number(req.params.lineitemid) ? req.body : item
    )
    res.json(
      req.session.cart.find(item => item.id === Number(req.params.lineitemid))
    )
  }
})

router.delete('/:lineitemid', async (req, res, next) => {
  try {
    if (req.session.userId) {
      await LineItem.destroy({
        where: {
          id: req.params.lineitemid
        }
      })
    } else {
      req.session.cart = req.session.cart.filter(
        item => item.id !== Number(req.params.lineitemid)
      )
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    if (req.session.userId) {
      await LineItem.destroy({
        where: {
          orderId: req.orderId
        }
      })
    } else {
      req.session.cart = []
    }
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
