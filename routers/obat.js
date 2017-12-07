var express = require('express')
var router = express.Router()
const Model = require('../models')
//home obat


router.get('/', function (req, res) {
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
                .catch(function (err) {
                  count++
                  if (count >= dataObats.length) {
                    res.render('obat',{obat:dataObats})
                  }
                })

            })
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

    Model.Obat.findAll()
    .then(function(dataObats) {
      Model.Obat.findById(id).then(function (dataObat) {
        // res.send(dataObat)
        res.render('editObat', {
          dataObats : dataObats,
          obat      : dataObat,
          error     : null
        })
      })
    })
    // Model.Obat.findById(id).then(function (dataObat) {
    //     // res.send(dataObat)
    //     res.render('editObat', {
    //         error: null,
    //         obat: dataObat,
    //     })
    // })
})

router.post('/edit/:id', function (req, res) {
    // res.send('masuk ga nih?')
    let id = req.params.id
    let objObat = {
        id: id,
        namaObat: req.body.namaObat.toLowerCase(),
        implikasiObat: req.body.implikasiObat
    }
    if (objObat.id == objObat.implikasiObat) {
      let id = req.params.id

      Model.Obat.findAll()
      .then(function(dataObats) {
        Model.Obat.findById(id).then(function (dataObat) {
          // res.send(dataObat)
          res.render('editObat', {
            dataObats : dataObats,
            obat      : dataObat,
            error     : 'obat implikasi tidak boleh sama dengan obat utama'
          })
        })
      })
    } else {
      Model.Obat.update(objObat, { where: { id } })
          .then(function () {
              res.redirect('/obats')
          })
          .catch(function (err) {
              console.log(err)

              let id = req.params.id

              Model.Obat.findAll()
              .then(function(dataObats) {
                Model.Obat.findById(id).then(function (dataObat) {
                  // res.send(dataObat)
                  res.render('editObat', {
                    dataObats : dataObats,
                    obat      : dataObat,
                    error     : err.message,
                  })
                })
              })
          })
    }
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
