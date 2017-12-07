'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Obats', [{
      namaObat: 'paracetamol',
      implikasiObat: 3,
    },{
      namaObat: 'paramex',
      implikasiObat: 1,
    },{
      namaObat: 'konidin',
      implikasiObat: 2,
    },{
      namaObat: 'diabetasol',
      implikasiObat: 9,
    },{
      namaObat: 'baca dokumentasi',
      implikasiObat: 0,
    },{
      namaObat: 'sering nanya instruktur',
      implikasiObat: 0,
    },{
      namaObat: 'banyak doa',
      implikasiObat: 9,
    },{
      namaObat: 'antangin',
      implikasiObat: 0,
    },{
      namaObat: 'morphin',
      implikasiObat: 0,
    },{
      namaObat: 'pil pgc',
      implikasiObat: 0,
    },{
      namaObat: 'ekstasi',
      implikasiObat: 0,
    },{
      namaObat: 'bunuh diri',
      implikasiObat: 0,
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Obats', [{
      namaObat: 'paracetamol',
      implikasiObat: 3,
    },{
      namaObat: 'paramex',
      implikasiObat: 1,
    },{
      namaObat: 'konidin',
      implikasiObat: 2,
    },{
      namaObat: 'diabetasol',
      implikasiObat: 9,
    },{
      namaObat: 'baca dokumentasi',
      implikasiObat: 0,
    },{
      namaObat: 'sering nanya instruktur',
      implikasiObat: 0,
    },{
      namaObat: 'banyak doa',
      implikasiObat: 9,
    },{
      namaObat: 'antangin',
      implikasiObat: 0,
    },{
      namaObat: 'morphin',
      implikasiObat: 0,
    },{
      namaObat: 'pil pgc',
      implikasiObat: 0,
    },{
      namaObat: 'ekstasi',
      implikasiObat: 0,
    },{
      namaObat: 'bunuh diri',
      implikasiObat: 0,
    }])

  }
};
