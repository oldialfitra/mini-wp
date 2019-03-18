const router = require('express').Router(),
    controllerUser = require('../controllers/user')

router.post('/login', controllerUser.login)

router.post('/register', controllerUser.register)

module.exports = router