const router = require('express').Router()
const { User } = require('../db/models/index')
module.exports = router

router.get('/', (req, res, next) => {
  if (!req.session.userId) {
    //    const error = new Error('No user found')
    //  error.status = 404
    //next(error)
    res.json({})
  } else {
    User.findByPk(req.session.userId)
      .then(user => res.json(user))
      .catch(next)
  }
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

router.delete('/', (req, res, next) => {
  req.session.destroy(() => res.sendStatus(204))
})
