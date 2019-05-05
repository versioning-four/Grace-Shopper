const router = require('express').Router()

const { User, LineItem, Order } = require('../db/models/index')

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then(user => res.send(user))
    .catch(next)
})

router.put('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  })
    .then(user => {
      if (user) {
        req.session.userId = user.id
        res.send(user)
      } else {
        const err = new Error('Incorrect credentials')
        err.status = 401
        next(err)
      }
    })
    .catch(next)
})

router.delete('/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).send('User deleted'))
    .catch(next)
})

router.post('/:userId/orders/:orderId/lineitem', (req, res, next) => {
  LineItem.create(req.body)
    .then(lineitem => res.json(lineitem))
    .catch(next)
})

router.get('/:userId/orders/:orderId/lineitems', (req, res, next) => {
  LineItem.findAll({
    where: {
      orderId: req.params.orderId
    }
  })
    .then(lineitems => res.json(lineitems))
    .catch(next)
})

router.post('/:userId/orders', (req, res, next) => {
  Order.findOrCreate({
    where: {
      status: 'cart',
      userId: req.params.userId
    },
    default: req.body
  })
    .then(order => res.json(order[0]))
    .catch(next)
})

router.get('/:userId/orders/', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.params.userId
    }
  })
    .then(orders => res.json(orders))
    .catch(next)
})

router.put('/:userId/orders/:orderId', (req, res, next) => {
  Order.findByPk(req.params.orderId)
    .then(order => order.update(req.body))
    .then(order => res.json(order))
    .catch(next)
})

router.put(
  '/:userId/orders/:orderId/lineitems/:lineitemid',
  (req, res, next) => {
    LineItem.findByPk(req.params.lineitemid)
      .then(lineitem => lineitem.update(req.body))
      .then(lineitem => res.json(lineitem))
      .catch(next)
  }
)
