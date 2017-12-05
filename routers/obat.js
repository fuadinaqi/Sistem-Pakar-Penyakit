var express = require('express')
var router = express.Router()
const Model = require('../models')
//home obat
router.get('/', function (req, res) {
    Model.Obat.findAll()
        .then(function (dataObats) {
            res.render('obat', { obat: dataObats })
        })
})
//add obat
router.get('/add', function (req, res) {
    res.render('addObat')
})

router.post('/add', function (req, res) {
    // res.send('masuk ke post')
    let objObat = {
        namaObat: req.body.namaObat,
        implikasiObat: req.body.implikasiObat
    }
    Model.Obat.create(objObat)
        .then(function () {
            // res.send('sukses')
            res.redirect('/obats')
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })

})
//edit obat
router.get('/edit/:id', function (req, res) {
    let id = req.params.id

    Model.Obat.findById(id).then(function (dataObat) {
        // res.send(dataObat)
        res.render('editObat', {
            obat: dataObat,
        })
    })
})

router.post('/edit/:id', function (req, res) {
    // res.send('masuk ga nih?')
    let id = req.params.id
    let objObat = {
        id: id,
        namaObat: req.body.namaObat,
        implikasiObat: req.body.implikasiObat
    }

    Model.Obat.update(objObat, { where: { id } })
        .then(function () {
            res.redirect('/obats')
        })
        .catch(function (err) {
            console.log(err)
            res.send(err)
        })
})

router.get('/delete/:id', function (req, res) {
    let id = req.params.id
    Model.Obat.destroy({ where: { id } })
    .then(function(){
        res.redirect('/obats')
    })
    .catch(function(err){
        console.log(err)
        res.send(err)
    })
})

module.exports = router