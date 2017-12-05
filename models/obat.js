'use strict';
module.exports = (sequelize, DataTypes) => {
  var Obat = sequelize.define('Obat', {
    namaObat: {
      type: DataTypes.STRING,
      validate: {
        isNull(value, next) {
          if (value.length == 0) {
            next('data tidak boleh kosong')
          } else {
            next()
          }
        },
        isUnique(value, next) {
          Obat.findAll({
            where:
              {
                namaObat: this.namaObat.toLowerCase(),
                id: { [sequelize.Op.ne]: this.id }
              }
          }).then(function (result) {
            if (result == null || result.length == 0) {
              return next()
            } else {
              return next(`obat ${result[0].namaObat} sudah terdaftar`)
            }
          })
        }
      }
    }
    ,
    implikasiObat: {
      type: DataTypes.STRING
    }
  });
  Obat.associate = function (models) {
    Obat.hasMany(models.DiagnosaDetail)
    Obat.belongsToMany(models.Diagnosa, {through : 'DiagnosaDetail'})
  };
  return Obat;
};
