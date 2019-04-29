const router = require('express').Router()

const { User } = require('../db/models/index')

module.exports = router

router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
})

router.delete('/:id', (req, res, next) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => res.status(204).send('User deleted'))
    .catch(next)
})
