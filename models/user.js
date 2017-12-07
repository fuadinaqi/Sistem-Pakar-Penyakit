'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      validate: {
        isNull(value, next) {
          if (value.length == 0) {
            next(`username tidak boleh kosong`)
          } else {
            next()
          }
        },
        isUnique: function (value, next) {
          User.findAll({
            where:
              {
                username: value.toLowerCase(),
                id: { [sequelize.Op.ne]: this.id }
              }
          })
            .then((data) => {
              if (data == null || data.length == 0) {
                return next()
              } else {
                return next(`username ${data[0].username} sudah digunakan`)
              }
            })
            .catch((err) => {
              return next(err)
            })
        }
      }
    },
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isNull(value, next) {
          if (value.length == 0) {
            next(`email tidak boleh kosong`)
          } else {
            next()
          }
        },
        isUnique: function (value, next) {
          User.findAll({
            where:
              {
                email: value.toLowerCase(),
                id: { [sequelize.Op.ne]: this.id }
              }
          })
            .then((data) => {
              if (data == null || data.length == 0) {
                return next()
              } else {
                return next(`email ${data[0].email} sudah digunakan`)
              }
            })
            .catch((err) => {
              return next(err)
            })
        }
      }
    },
    role : DataTypes.STRING
  });
  User.beforeBulkUpdate(function (user, options) { //direct method hook
    return bcrypt.hash(user.attributes.password, 10)
      .then(function (hash) {
        user.attributes.password = hash
      })
  });

  User.beforeCreate(function (user, options) { //direct method hook
    return bcrypt.hash(user.password, 10)
      .then(function (hash) {
        user.password = hash
      })
  });
  User.prototype.compare_password = function (plain_password, cb) {
    bcrypt.compare(plain_password, this.password).then(function (res) {
      // console.log(`password`, this.password);
      cb(res)
    })
  }
  return User;
};
