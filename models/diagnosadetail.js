'use strict';
module.exports = (sequelize, DataTypes) => {
  var DiagnosaDetail = sequelize.define('DiagnosaDetail', {
    DiagnosaId: DataTypes.INTEGER,
    ObatId: DataTypes.INTEGER
  });

  DiagnosaDetail.associate = function (models) {
    DiagnosaDetail.belongsTo(models.Obat);
    DiagnosaDetail.belongsTo(models.Diagnosa);
  };
  return DiagnosaDetail;
};
