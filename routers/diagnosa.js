var express = require('express')
var router = express.Router()
const Model = require('../models')

//home obat
router.get('/', function (req, res) {
    Model.Diagnosa.findAll()
        .then(function (dataDiagnosas) {
            res.render('diagnosa', { dataDiagnosas: dataDiagnosas })
        })
})
//add obat
router.get('/add', function (req, res) {
    res.render('addDiagnosa', {
      err : null,
    })
})

router.post('/add', function (req, res) {
    // res.send('masuk ke post')
    let objDiagnosa = {
        namaPenyakit: req.body.namaPenyakit.toLowerCase()
    }
    Model.Diagnosa.create(objDiagnosa)
        .then(function () {
            // res.send('sukses')
            res.redirect('/diagnosas')
        })
        .catch(function (err) {
            res.render('addDiagnosa', {
              err : err.message,
            })
        })

})
//edit obat
router.get('/edit/:id', function (req, res) {
    let id = req.params.id

    Model.Diagnosa.findById(id).then(function (dataDiagnosa) {
        // res.send(dataObat)
        res.render('editDiagnosa', {
            dataDiagnosa: dataDiagnosa,
            err : null,
        })
    })
})

router.post('/edit/:id', function (req, res) {
    // res.send('masuk ga nih?')
    let id = req.params.id
    let objDiagnosa = {
        id: id,
        namaPenyakit: req.body.namaPenyakit.toLowerCase()
    }

    Model.Diagnosa.update(objDiagnosa, { where: { id } })
        .then(function () {
            res.redirect('/diagnosas')
        })
        .catch(function (err) {
          Model.Diagnosa.findById(id).then(function (dataDiagnosa) {
              // res.send(dataObat)
              res.render('editDiagnosa', {
                  dataDiagnosa: dataDiagnosa,
                  err : err.message,
              })
          })
        })
})

router.get('/delete/:id', function (req, res) {
    let id = req.params.id
    Model.Diagnosa.destroy({ where: { id } })
        .then(function () {
            res.redirect('/diagnosas')
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})

module.exports = router
