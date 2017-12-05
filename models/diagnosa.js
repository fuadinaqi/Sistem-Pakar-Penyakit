'use strict';
module.exports = (sequelize, DataTypes) => {
  var Diagnosa = sequelize.define('Diagnosa', {
    namaPenyakit: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Diagnosa;
};