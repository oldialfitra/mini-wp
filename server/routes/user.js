const router = require('express').Router(),
    controllerUser = require('../controllers/user')

router.post('/login', controllerUser.login)

router.post('/register', controllerUser.register)

router.post('/googleSign', controllerUser.signIn)

module.exports = router