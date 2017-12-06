'use strict';
module.exports = (sequelize, DataTypes) => {
  var DiagnosaDetail = sequelize.define('DiagnosaDetail', {
    DiagnosaId: {
      type: DataTypes.INTEGER,
      validate: {
        isNull(value, next) {
          if (value.length == 0) {
            next('data tidak boleh kosong')
          } else {
            next()
          }
        },
        isAssign(value, next) {
          // console.log('!----!',this.StudentId)
          DiagnosaDetail.findOne({ where: { DiagnosaId: value, ObatId: this.ObatId } })
            .then(function (result) {
              
              if (result) {
                next('obat sudah di tambahkan pada list')
              } else {
                next()
              }

            })
        }
      }
    },
    ObatId: DataTypes.INTEGER
  });

  DiagnosaDetail.associate = function (models) {
    DiagnosaDetail.belongsTo(models.Obat);
    DiagnosaDetail.belongsTo(models.Diagnosa);
  };
  return DiagnosaDetail;
};
