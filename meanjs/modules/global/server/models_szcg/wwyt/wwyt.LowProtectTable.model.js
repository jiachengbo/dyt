'use strict';

module.exports = function (sequelize, DataTypes) {

  var LowProtectTable = sequelize.define('LOWPROTECTTABLE',
    {
      LowProtectId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      LowProtectName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      LowProtectSex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      LowProtectAge: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      IDNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      familyPopNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      guaranteePopNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      HousePlace: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      addresss: {
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
      LowBeginDate: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      LowNo: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      HouseMonthMoney: {
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
  return LowProtectTable;
};
