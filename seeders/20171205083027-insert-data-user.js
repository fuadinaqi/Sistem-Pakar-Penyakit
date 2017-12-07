'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'fuadi',
      password: '1234',
      email   : 'fuadinaqi@gmail.com',
      role    : 'admin'
    }, {
      username: 'apis',
      password: '1234',
      email   : 'hafizhabdillah@gmail.com',
      role    : 'admin'
    }, {
      username: 'dani',
      password: '1234',
      email   : 'dhaniluthfi@gmail.com',
      role    : 'pasien'
    }])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [{
      username: 'fuadi',
      password: '1234',
      email   : 'fuadinaqi@gmail.com',
      role    : 'admin'
    }, {
      username: 'apis',
      password: '1234',
      email   : 'hafizhabdillah@gmail.com',
      role    : 'admin'
    }, {
      username: 'dani',
      password: '1234',
      email   : 'dhaniluthfi@gmail.com',
      role    : 'pasien'
    }])
  }
};
