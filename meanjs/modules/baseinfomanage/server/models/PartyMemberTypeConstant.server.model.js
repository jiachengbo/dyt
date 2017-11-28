'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var PartyMememberTypeConstant = sequelize.define('PartyMememberTypeConstant',
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
        comment: '党员类型名'
      }
    },
    {
      comment: '党员类型常量表'
    }
  );
  dbExtend.addBaseCode('PartyMememberTypeConstant', {attributes: ['id', 'name']});
  return PartyMememberTypeConstant;
};
