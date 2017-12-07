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
  res.render('addUser', {
    err : null,
  })
})
router.post('/add', function(req, res) {
  let objCreate = {
    username : req.body.username.toLowerCase(),
    password : req.body.password,
    email    : req.body.email.toLowerCase(),
    role : req.body.role.toLowerCase()
  }
  Model.User.create(objCreate)
  .then(function() {
    res.redirect('/users')
  })
  .catch(function(err) {
    console.log(err);
    res.render('addUser', {
      err : err.message,
    })
  })
})
//EDIT USER
router.get('/edit/:id', function(req, res) {
  Model.User.findById(req.params.id)
  .then(function(dataUser) {
    res.render('editUser', {
      dataUser : dataUser,
      err      : null,
    })
  })
  .catch(function(err) {
    console.log(err);
    res.send(err)
  })
})
router.post('/edit/:id', function(req, res) {
  let objUpdate = {
    id       : req.params.id,
    username : req.body.username.toLowerCase(),
    password : req.body.password,
    email    : req.body.email.toLowerCase(),
    role     : req.body.role,
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
    Model.User.findById(req.params.id)
    .then(function(dataUser) {
      res.render('editUser', {
        dataUser : dataUser,
        err      : err.message,
      })
    })
    .catch(function(err) {
      console.log(err);
      res.send(err)
    })
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

router.get('/sakit',function(req,res){
  Model.Diagnosa.findAll()
  .then(function(dataDiagnosas){
    res.render('sakit',{dataDiagnosas:dataDiagnosas})
  })
})
module.exports = router
