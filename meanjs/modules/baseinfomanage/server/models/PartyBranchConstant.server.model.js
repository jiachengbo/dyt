'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var PartyBranchConstant = sequelize.define('PartyBranchConstant',
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
        comment: '党支部名'
      }
    },
    {
      comment: '党支部常量表'
    }
  );
  dbExtend.addBaseCode('PartyBranchConstant', {attributes: ['id', 'name']});
  return PartyBranchConstant;
};
