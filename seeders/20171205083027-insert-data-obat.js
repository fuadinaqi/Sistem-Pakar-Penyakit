'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Obats', [{
      namaObat: 'paracetamol',
      implikasiObat: 'puyer'
    },{
      namaObat: 'puyer',
      implikasiObat: 'paracetamol'
    }], {});
    
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Obats', [{
      namaObat: 'paracetamol',
      implikasiObat: 'puyer'
    },{
      namaObat: 'puyer',
      implikasiObat: 'paracetamol'
    }], {});
    
  }
};
