'use strict';

module.exports = function (sequelize, DataTypes) {

  var CPPCCTable = sequelize.define('CPPCCTABLE',
    {
      CPPCCId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      CPPCCName: {
        type: DataTypes.STRING(50),
        isimg: true,
        comment: ''
      },
      CPPCCCircle: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      CPPCCBirth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CPPCCNation: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      CPPCCParty: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      CPPCCCulture: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      CPPCCPost: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CPPCCTel: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      CircleNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUserId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyUserId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return CPPCCTable;
};
