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

router.delete('/:id', (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then(() => res.status(204).send('User deleted'))
    .catch(next)
})

router.get('/:userId/lineitems', (req, res, next) => {
  LineItem.findAll({
    include: [
      {
        model: Order,
        where: {
          userId: req.params.userId
        }
      }
    ]
  })
    .then(lineitems => res.json(lineitems))
    .catch(next)
})
