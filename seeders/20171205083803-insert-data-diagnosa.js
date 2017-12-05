'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Diagnosas', [{
      namaPenyakit: 'Demam',
    }, {
      namaPenyakit: 'Batuk',
    }, {
      namaPenyakit: 'Migrain',
    }, {
      namaPenyakit: 'Pilek',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Diagnosas', [{
      namaPenyakit: 'Demam',
    }, {
      namaPenyakit: 'Batuk',
    }, {
      namaPenyakit: 'Migrain',
    }, {
      namaPenyakit: 'Pilek',
    }]);
  }
};
