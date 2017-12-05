'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'fuadinaqi',
      password: 'implikasi123',
      email   : 'fuadinaqi@gmail.com'
    }, {
      username: 'hafizhabdillah',
      password: 'diagnosa123',
      email   : 'hafizhabdillah@gmail.com',
    }, {
      username: 'dhaniluthfi',
      password: 'obat123',
      email   : 'dhaniluthfi@gmail.com',
    },]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [{
      username: 'fuadinaqi',
      password: 'implikasi123',
      email   : 'fuadinaqi@gmail.com'
    }, {
      username: 'hafizhabdillah',
      password: 'diagnosa123',
      email   : 'hafizhabdillah@gmail.com',
    }, {
      username: 'dhaniluthfi',
      password: 'obat123',
      email   : 'dhaniluthfi@gmail.com',
    },]);
  }
};
