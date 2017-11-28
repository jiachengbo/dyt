'use strict';

module.exports = function (sequelize, DataTypes) {

  var MotherHealthTable = sequelize.define('MOTHERHEALTHTABLE',
    {
      MotherId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      MotherName: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      MotherCard: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      BirthDate: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      marriageCondition: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      CheckTime: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      NowAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      HuJiAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      BelongAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Detail: {
        type: DataTypes.STRING(50),
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
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(200),
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
  return MotherHealthTable;
};
