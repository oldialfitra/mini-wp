const user = require('../models/user'),
    jwt = require('jsonwebtoken'),
    decrypt = require('../helpers/decrypt'),
    env = require('dotenv').config()

class User {

    static login(req, res) {
        user.findOne({
                email: req.body.email
            })
            .then(function(ulogin) {
                console.log(ulogin)
                if (!ulogin) {
                    res.status(404).json({
                            message: 'Username / password wrong'
                        })
                        // throw new Error('Username / password wrong')
                        // res.status(404).json({ message: 'Username / password wrong' })
                } else {
                    if (decrypt(req.body.password, ulogin.password) === false) {
                        res.status(404).json({
                                message: 'Username / password wrong'
                            })
                            // throw new Error('Username / password wrong')
                            // res.status(404).json({ message: 'Username / password wrong' })
                    } else {
                        // console.log('masuk login')
                        // jwt.sign({ email: ulogin.email }, process.env.SECRET)
                        let token = jwt.sign({ email: ulogin.email }, process.env.SECRET)
                            // console.log(jwt.sign({ email: ulogin.email }, process.env.SECRET))
                        let obj = {
                            token,
                            id: ulogin._id
                        }
                        res.status(200).json(obj)
                    }
                }
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }

    static register(req, res) {
        user.create({
                email: req.body.email,
                password: req.body.password
            })
            .then(function(newUser) {
                res.status(201).json(newUser)
            })
            .catch(function(err) {
                res.status(500).json(err)
            })
    }
}

module.exports = User