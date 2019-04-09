const express = require('express')
const authRouter = express.Router()
const JWT = require('jsonwebtoken')
const User = require('../models/user.js')



//sign up route
authRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (user) {
            res.status(400)
            return next(new Error("That Username is already taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if (err) {
                console.log(err)
                res.status(500)
                return next(new Error("Username AND Password are required"))
            }
            const token = JWT.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({ user: savedUser.withoutPassword(), token })
        })
    })
})

// login
authRouter.post("/login", (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (!user) {
            res.status(400)
            return next(new Error("Username or password are incorrect"))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            if (!isMatch) {
                res.status(401)
                return next(new Error("Username or Password are incorrect"))
            }
            const token = JWT.sign(user.withoutPassword(), process.env.SECRET)
            res.status(200).send({ user: user.withoutPassword(), token })
        })
    })
})



module.exports = authRouter
