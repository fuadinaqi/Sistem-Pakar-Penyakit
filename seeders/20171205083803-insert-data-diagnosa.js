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
    }, {
      namaPenyakit: 'Diare',
    }, {
      namaPenyakit: 'Muntaber',
    }, {
      namaPenyakit: 'Insomnia',
    }, {
      namaPenyakit: 'Kangen Dia',
    }, {
      namaPenyakit: 'Demam final Live Code',
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
    }, {
      namaPenyakit: 'Diare',
    }, {
      namaPenyakit: 'Muntaber',
    }, {
      namaPenyakit: 'Insomnia',
    }, {
      namaPenyakit: 'Kangen Dia',
    }, {
      namaPenyakit: 'Demam final Live Code',
    }]);
  }
};
