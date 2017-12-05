'use strict';
module.exports = (sequelize, DataTypes) => {
  var Obat = sequelize.define('Obat', {
    namaObat: DataTypes.STRING,
    implikasiObat: DataTypes.STRING
  });
  return Obat;
};
