'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var NationConstant = sequelize.define('NationConstant',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '民族名'
      }
    },
    {
      comment: '56民族常量表'
    }
  );
  dbExtend.addBaseCode('NationConstant', {attributes: ['id', 'name']});
  return NationConstant;
};
