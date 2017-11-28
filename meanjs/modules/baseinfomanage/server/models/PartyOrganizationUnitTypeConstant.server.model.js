'use strict';
var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var PartyOrganizationUnitTypeConstant = sequelize.define('PartyOrganizationUnitTypeConstant',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '单位类别序号'
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '单位类别名称'
      },
      roles: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '角色'
      }
    },
    {
      comment: '党组织单位类别表'
    }
  );
  dbExtend.addBaseCode('PartyOrganizationUnitTypeConstant', {attributes: ['id', 'name', 'roles']});
  return PartyOrganizationUnitTypeConstant;
};
