'use strict';
module.exports = (sequelize, DataTypes) => {
  var Diagnosa = sequelize.define('Diagnosa', {
    namaPenyakit: {
      type  : DataTypes.STRING,
      validate  : {
        isNull(value, next) {
          if (value.length == 0) {
            next(`Nama Penyakit tidak boleh kosong`)
          } else {
            next()
          }
        },
        isUnique : function(value, next) {
          Diagnosa.findAll({
            where :
            {
              namaPenyakit : value.toLowerCase(),
              id : {[sequelize.Op.ne] : this.id}
            }
          })
          .then((data) => {
            if (data == null || data.length == 0) {
              return next()
            } else {
              return next(`${data[0].namaPenyakit} sudah ada didalam database`)
            }
          })
          .catch((err) => {
            return next(err)
          })
        }
      }
    }
  }); 
  Diagnosa.associate = function (models) {
    Diagnosa.hasMany(models.DiagnosaDetail)
    Diagnosa.belongsToMany(models.Obat, {through : 'DiagnosaDetail'})
  };
  return Diagnosa;
};
