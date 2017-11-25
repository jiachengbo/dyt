'use strict';
var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var WomensFederationTypeTable = sequelize.define('WomensFederationTypeTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '类型名称'
      }
    },
    {
      comment: '妇联活动类型表'
    }
  );
  dbExtend.addBaseCode('WomensFederationTypeTable', {attributes: ['id', 'name']});
  return WomensFederationTypeTable;
};
