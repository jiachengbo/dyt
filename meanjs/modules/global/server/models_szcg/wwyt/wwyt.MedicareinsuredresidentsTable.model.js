'use strict';

module.exports = function (sequelize, DataTypes) {

  var MedicareinsuredresidentsTable = sequelize.define('MEDICAREINSUREDRESIDENTSTABLE',
    {
      medicareId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      medicareName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      medicareNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      medicareUnitName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      medicarePersonalNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      medicareNo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      medicareStatus: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      medicareTel: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      medicareAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      medicareTime: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      medicareType: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Belong: {
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
  return MedicareinsuredresidentsTable;
};
