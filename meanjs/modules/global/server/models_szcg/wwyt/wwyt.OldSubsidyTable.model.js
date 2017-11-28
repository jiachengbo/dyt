'use strict';

module.exports = function (sequelize, DataTypes) {

  var OldSubsidyTable = sequelize.define('OLDSUBSIDYTABLE',
    {
      OldSubsidyId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      OldSubsidyName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OldSubsidySex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      OldSubsidyAge: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      OldSubsidyBirth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      OldSubsidyHouse: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OldSubsidyPlace: {
        type: DataTypes.STRING(100),
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
      address: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      registerDate: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SubsidyBank: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      BankCardNo: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      SubsidyMoney: {
        type: DataTypes.STRING(200),
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
  return OldSubsidyTable;
};
