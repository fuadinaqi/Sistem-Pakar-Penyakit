'use strict';
module.exports = (sequelize, DataTypes) => {
  var Diagnosa = sequelize.define('Diagnosa', {
    namaPenyakit: DataTypes.STRING
  });
  return Diagnosa;
};