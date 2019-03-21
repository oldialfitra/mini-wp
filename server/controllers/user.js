const user = require('../models/user'),
    jwt = require('jsonwebtoken'),
    decrypt = require('../helpers/decrypt'),
    env = require('dotenv').config(),
    { OAuth2Client } = require('google-auth-library'),
    client = new OAuth2Client(process.env.CLIENT_ID)

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

    static signIn(req, res) {
        console.log('masuk di sig in')
        console.log(req.body.id_token)
        var newEmail = ''
        client.verifyIdToken({
                idToken: req.body.id_token,
                Audience: process.env.CLIENT_ID
            })
            .then(function(ticket) {
                console.log(ticket)
                // console.log('dapat pass')
                // console.log(pass)
                // console.log(pass.getPayload())
                // console.log(pass.getPayload().email)
                    // const { email, name, piscture } = ticket.getPayLoad()
                newEmail = ticket.getPayload().email
                return User.findOne({
                    email: newEmail
                })
            })
            .then(function(user) {
                console.log(user)
                if (!user) {
                    console.log(newEmail, 'in email baru')
                    return User.create({
                        email: newEmail,
                        password: 'password'
                    })
                } else {
                    // console.log('ini google')
                    // const token = jwt.sign({ email: newEmail }, process.env.CLIENT_ID)
                    // res.status(200).json({
                    //     email,
                    //     name,
                    //     picture,
                    //     token
                    // })
                    return user
                }
            })
            .then(function(newUser) {
                console.log('====================ini baru')
                console.log(newUser);
                
                let {email, name, picture} = newUser
                const token = jwt.sign({ email: newUser.email }, process.env.CLIENT_ID)
                res.status(200).json({
                    email,
                    name,
                    picture,
                    token
                })
            })
            .catch(function(err) {
                console.log(err)
                res.status(500).json(err)
            })
        // if (!req.body.token) {
        //     res.status(404).json({
        //         message: 'Invalid token'
        //     })
        // } else {
        //     client.verifyIdToken({
        //             idToken: req.body.token,
        //             audience: process.env.CLIENT_ID
        //         })
        //         .then(function(ticket) {
        //             const { email, name, picture } = ticket.getPayload()
        //             const token = jwt.sign({ email }, process.env.SECRET)
        //             res.status(200).json(token)
        //             const match = compareToken(token)
        //             if (match) {
        //                 return user.findOne({
        //                         email: match.email
        //                     })
        //                     .then(function(uLogin) {
        //                         if (!uLogin) {
        //                             return user.create({
        //                                 email: match.email,
        //                                 password: process.env.PASSWORD
        //                             })
        //                         }
        //                     })
        //             }
        //         })
        //         .catch(function(err) {
        //             res.status(500).json(err)
        //         })
        // }
    }
}

module.exports = User