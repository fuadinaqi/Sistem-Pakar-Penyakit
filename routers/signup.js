var express = require('express')
var router = express.Router()
const Model = require('../models')

router.get('/', function (req, res) {
    res.render('signup', {
        err: null
    })
})
router.post('/', function (req, res) {
    // res.send('masuk sini')
    let objCreate = {
        username: req.body.username.toLowerCase(),
        password: req.body.password,
        email: req.body.email.toLowerCase(),
        role: req.body.role
    }
    // res.send(objCreate)
    Model.User.create(objCreate)
        .then(function () {
            res.redirect('/login')
        })
        .catch(function (err) {
            console.log(err);
            res.render('signup', {
                err: err.message,
            })
        })
})

module.exports = router
