'use strict';
module.exports = (sequelize, DataTypes) => {
  var Obat = sequelize.define('Obat', {
    namaObat: DataTypes.STRING,
    implikasiObat: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Obat;
};