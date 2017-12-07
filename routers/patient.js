const express = require('express');
const router = express.Router()
const Model = require('../models');
const authHelper = require('../helpers/authHelper');

router.get('/sakit/:id/obat', function(req, res) {
  Model.Diagnosa.findById(req.params.id, {
    include : [Model.Obat]
  })
  .then(function(dataDiagnosa) {
    res.render('resep', {
      dataDiagnosa : dataDiagnosa,
    })
  })
})

router.post('/sakit/:id/obat', function(req, res) {
  let arrListObat = req.body.listObat
  if (typeof(arrListObat) == 'object') {
    Model.Obat.findAll({
      where : {
        id : {
          [Model.sequelize.Op.in]: arrListObat
        },
      }, include : [{
        model : Model.Diagnosa,
        where : {id : req.params.id}
      }],
        order : [['id', 'ASC']]
    })
    .then(obats => {
      let count = 0;
      obats.forEach(function(obat) {
        if (arrListObat.indexOf(String(obat.implikasiObat)) !== -1) {
          Model.Obat.findById(obat.implikasiObat)
          .then(function(implikasi) {
            // console.log(count);
            obat.dataValues.namaImplikasi = implikasi.namaObat
            if (count >= obats.length - 1) {
              res.render('reportObatFail', {
                obats : obats,
              })
            }
            count++
          })
        } else {
          count++
          if (count >= obats.length) {
            res.render('reportObat', {
              obats : obats,
            })
          }
        }
      })
    })
  } else {
    console.log('Masukkkk');
    Model.Obat.findAll({
      where : {
        id : arrListObat,
      }, include : [{
        model : Model.Diagnosa,
        where : {id : req.params.id}
      }],
        order : [['id', 'ASC']]
    })
    .then(function (obats) {
      res.render('reportObat', {
        obats : obats
      })
    })
    .catch(function (err) {
      console.log(err);
      res.send(err)
    })
  }
})

router.get('/sakit', function(req, res) {
  Model.Diagnosa.findAll()
  .then(function(dataPenyakits) {
    res.render('sick', {
      dataPenyakits : dataPenyakits,
    })
  })
})

router.post('/sakit', function(req, res) {
  let idSakit = req.body.id
  res.redirect(`/patients/sakit/${idSakit}/obat`)
})

router.get('/logout', authHelper.cekLoginPatient, function (req, res) {
    req.session.destroy(function (err) {
        if (!err) {
            res.redirect('/')
        } else {
            res.send(err)
        }
    })
})

module.exports = router;
