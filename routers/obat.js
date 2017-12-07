var express = require('express')
var router = express.Router()
const Model = require('../models')
//home obat


router.get('/', function (req, res) {
    console.log('obats')
    Model.Obat.findAll()
        .then(function (dataObats) {
          if (dataObats.length == 0) {
            res.render('obat', {
              obat : dataObats
            })
          }
            let count = 0;
            dataObats.forEach(function(row){
                Model.Obat.findOne({where:{id:row.implikasiObat}})
                .then(function(namaImplikasi){
                    row.dataValues.namaImplikasi = namaImplikasi.namaObat
                    if(dataObats.length-1 <= count){
                        res.render('obat',{obat:dataObats})
                    }
                    count++

                })

            })
        }).catch(function (err) {
            res.send(err)
        })
})

//add obat
router.get('/add', function (req, res) {
  Model.Obat.findAll()
  .then(function(dataObats) {
    res.render('addObat', {
      dataObats : dataObats,
        error: null
    })
  })
})

router.post('/add', function (req, res) {
    // res.send('masuk ke post')
    let objObat = {
        namaObat      : req.body.namaObat.toLowerCase(),
        implikasiObat : req.body.implikasiObat
    }
    Model.Obat.create(objObat)
        .then(function () {
            res.redirect('/obats')
        })
        .catch(function (err) {
          Model.Obat.findAll()
          .then(function(dataObats) {
            res.render('addObat', {
              dataObats : dataObats,
                error: err.message,
            })
          })
        })
})
//edit obat
router.get('/edit/:id', function (req, res) {
    let id = req.params.id

    Model.Obat.findById(id).then(function (dataObat) {
        // res.send(dataObat)
        res.render('editObat', {
            error: null,
            obat: dataObat,
        })
    })
})

router.post('/edit/:id', function (req, res) {
    // res.send('masuk ga nih?')
    let id = req.params.id
    let objObat = {
        id: id,
        namaObat: req.body.namaObat.toLowerCase(),
        implikasiObat: req.body.implikasiObat
    }

    Model.Obat.update(objObat, { where: { id } })
        .then(function () {
            res.redirect('/obats')
        })
        .catch(function (err) {
            console.log(err)

            Model.Obat.findById(id).then(function (dataObat) {
                // res.send(dataObat)
                res.render('editObat', {
                    error: err.message,
                    obat: dataObat,
                })
            })
        })
})

router.get('/delete/:id', function (req, res) {
    let id = req.params.id
    Model.Obat.destroy({ where: { id } })
        .then(function () {
            res.redirect('/obats')
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})



module.exports = router
