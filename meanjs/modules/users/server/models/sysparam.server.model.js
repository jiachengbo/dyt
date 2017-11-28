'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {
  var SysParam = sequelize.define('SysParam',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        validate: {
          notEmpty: true
        }
      },
      data: {
        type: DataTypes.STRING(1000),
        allowNull: true
      }
    },
    {
      comment: '系统参数表',
      getterMethods: {
        data: dbExtend.getterMethodJson
      },
      setterMethods: {
        data: dbExtend.setterMethodJson
      }
    }
  );

  return SysParam;
};
