var express = require('express')
var router = express.Router()
const Model = require('../models')

//HOME USER
router.get('/', function(req, res) {
  Model.User.findAll()
  .then(function(dataUsers) {
    res.render('user', {
      dataUsers : dataUsers,
    })
  })
})
//ADD USER
router.get('/add', function(req, res) {
  res.render('addUser')
})
router.post('/add', function(req, res) {
  let objCreate = {
    username : req.body.username,
    password : req.body.password,
    email    : req.body.email,
  }
  Model.User.create(objCreate)
  .then(function() {
    res.redirect('/users')
  })
  .catch(function(err) {
    console.log(err);
    res.send(err)
  })
})
//EDIT USER
router.get('/edit/:id', function(req, res) {
  Model.User.findById(req.params.id)
  .then(function(dataUser) {
    res.render('editUser', {
      dataUser : dataUser,
    })
  })
})
router.post('/edit/:id', function(req, res) {
  let objUpdate = {
    id       : req.params.id,
    username : req.body.username,
    password : req.body.password,
    email    : req.body.email,
  }
  Model.User.update(objUpdate, {
    where : {
      id : req.params.id
    }
  })
  .then(function() {
    res.redirect('/users')
  })
  .catch(function(err) {
    console.log(err);
    res.send(err)
  })
})
//DELETE USER
router.get('/delete/:id', function(req, res) {
  Model.User.destroy({
    where : {
      id : req.params.id,
    }
  })
  .then(function() {
    res.redirect('/users')
  })
  .catch(function(err) {
    console.log(err);
    res.send(err)
  })
})
module.exports = router
