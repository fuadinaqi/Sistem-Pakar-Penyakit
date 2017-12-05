'use strict';
module.exports = (sequelize, DataTypes) => {
  var DiagnosaDetail = sequelize.define('DiagnosaDetail', {
    DiagnosaId: DataTypes.INTEGER,
    ObatId: DataTypes.INTEGER
  });
  return DiagnosaDetail;
};