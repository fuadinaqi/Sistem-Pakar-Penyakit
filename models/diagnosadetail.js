'use strict';
module.exports = (sequelize, DataTypes) => {
  var DiagnosaDetail = sequelize.define('DiagnosaDetail', {
    DiagnosaId: DataTypes.INTEGER,
    ObatId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return DiagnosaDetail;
};