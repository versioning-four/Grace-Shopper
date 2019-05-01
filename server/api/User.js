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
        .then( user => res.send(user))
        .catch(next)
})

router.put('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password
        }
    })
    .then((user) => {
        if (user) {
            // console.log('put route getting hit')
            req.session.userId = user.id
            res.send(user)
        }
        else {
            const err = new Error('Incorrect credentials')
            err.status = 401
            next(err)
        }
    })
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

//error handling
router.use((error, req, res, next) => {
    let errors = [error];

    if ( error.errors ){
      errors = error.errors.map( err => err.message);
    }
    else if (error.original){
      errors = [error.original.message];
    }

    console.error(errors);
    res.status(error.status || 500).send({ errors });
});
