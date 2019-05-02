const router = require('express').Router()

const { User } = require('../db/models/index')

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
