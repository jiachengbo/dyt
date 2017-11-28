'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var NationPlaceConstant = sequelize.define('NationPlaceConstant',
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
        comment: '籍贯名'
      }
    },
    {
      comment: '籍贯常量表'
    }
  );
  dbExtend.addBaseCode('NationPlaceConstant', {attributes: ['id', 'name']});
  return NationPlaceConstant;
};
