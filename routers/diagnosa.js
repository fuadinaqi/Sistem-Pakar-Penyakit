var express = require('express')
var router = express.Router()
const Model = require('../models')
// const Op = Sequelize.Op;

//home obat
router.get('/', function (req, res) {
    // res.send('masuk')
    Model.Diagnosa.findAll()
        .then(function (dataDiagnosas) {
            res.render('diagnosa', { dataDiagnosas: dataDiagnosas })
        })
})
//add obat
router.get('/add', function (req, res) {
    res.render('addDiagnosa', {
        err: null,
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
                err: err.message,
            })
        })

})
//edit obat
router.get('/edit/:id', function (req, res) {
    let id = req.params.id

    Model.Diagnosa.findById(id).then(function (dataDiagnosa) {
        // res.send(dataDiagnosa)
        res.render('editDiagnosa', {
            dataDiagnosa: dataDiagnosa,
            err: null,
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

                res.render('editDiagnosa', {
                    dataDiagnosa: dataDiagnosa,
                    err: err.message,
                })
            })
        })
})
// delete obat
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
//assign obat
router.get('/assignObat/:id', function (req, res) {
    Model.Diagnosa.findOne({
        where: { id: req.params.id }
    })
        .then(function (dataDiagnosa) {
            Model.Obat.findAll()
                .then(function (dataObats) {
                    res.render('assignObat', {
                        dataDiagnosa: dataDiagnosa,
                        dataObats: dataObats,
                        error: null
                    })
                })
                .catch(function (err) {
                    console.log(err);
                    res.send(err)
                })
        })
        .catch(function (err) {
            console.log(err);
            res.send(err)
        })
})
router.post('/assignObat/:id', function (req, res) {
    let objAssign = {
        DiagnosaId: req.params.id,
        ObatId: req.body.ObatId,
    }
    Model.DiagnosaDetail.create(objAssign)
        .then(function () {
            res.redirect('/diagnosas')
        })
        .catch(function (err) {
            Model.Diagnosa.findOne({
                where: { id: req.params.id }
            })
                .then(function (dataDiagnosa) {
                    Model.Obat.findAll()
                        .then(function (dataObats) {
                            res.render('assignObat', {
                                dataDiagnosa: dataDiagnosa,
                                dataObats: dataObats,
                                error: err.message
                            })
                        })
                        .catch(function (err) {
                            console.log(err);
                            res.send(err)
                        })
                })
                .catch(function (err) {
                    console.log(err);
                    res.send(err)
                })
        })
})
// select * from namaTable where diagnosa like %panas%

router.get('/listObat/:id', function (req, res) {
    // res.send("masuk sini")

    Model.Diagnosa.findById(req.params.id, {
        include: [Model.Obat, Model.DiagnosaDetail]
    }).then(function (result) {
        res.render('listObat', {
            dataConjunction: result
        })
    }).catch(function (err) {
        res.send(err)
    })
})

router.get('/sakit/:id/obat', function(req, res) {
  Model.Diagnosa.findById(req.params.id, {
    include : [Model.Obat]
  })
  .then(function(dataDiagnosa) {
    // res.send(dataDiagnosa.Obats[0])
    res.render('resep', {
      dataDiagnosa : dataDiagnosa,
    })
  })
})

router.post('/sakit/:id/obat', function(req, res) {
  let arrListObat = req.body.listObat
  console.log(arrListObat);
    Model.Obat.findAll({
      where : {
        id : {
          [Model.sequelize.Op.in]: arrListObat
        },
      },
        order : [['id', 'ASC']]
    })
    .then(obats => {
      // console.log(arrListObat.indexOf('1'));
      // res.send(obats)
      // console.log(obats[0]);
      let count = 0;
      obats.forEach(function(obat) {
        if (arrListObat.indexOf(String(obat.implikasiObat)) !== -1) {
          // console.log(obat.namaObat);
          Model.Obat.findById(obat.implikasiObat)
          .then(function(implikasi) {
            console.log(`obatnya `, obat.namaObat);
            console.log(`terimplikasi dengan obat `, implikasi.namaObat);
          })
        }
        if (count >= obats.length - 1) {

        }
        count++
      })
    })
})



//------------INI UDAH JALAN----------------
// router.post('/sakit/:id/obat', function(req, res) {
//   let arrListObat = req.body.listObat
//   console.log(arrListObat);
//   if (arrListObat.length > 1) {
//     let count = 0;
//
//     for (let i = 0; i < arrListObat.length; i++) {
//       Model.Obat.findById(arrListObat[i])
//       .then(function(obat) {
//         let isImplikasi = false;
//         let arrImplikasi = []
//         for (let j = 0; j < arrListObat.length; j++) {
//           // console.log('count ', count);
//           // console.log('length ', req.body.listObat.length);
//           if (obat.implikasiObat == arrListObat[j]) {
//             arrImplikasi.push(obat.namaObat)
//             // res.send('terdapat implikasi')
//             // console.log(obat.namaObat);
//             // console.log(arrImplikasi);
//             isImplikasi = true;
//             break;
//           }
//           // if (count >= arrListObat.length - 1) {
//           //   res.send('hai')
//           // }
//         }
//         if (count >= arrListObat.length - 1) {
//           if(isImplikasi) {
//             res.send(`terdapat implikasi ${arrImplikasi}`)
//           } else {
//             res.redirect('/diagnosas')
//           }
//         }
//
//         count++;
//       })
//     }
//   } else {
//     res.send('tidak terdapat implikasi obat')
//   }
// })

module.exports = router
