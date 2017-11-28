'use strict';

module.exports = function (sequelize, DataTypes) {

  var BirthInsuranceTable = sequelize.define('BIRTHINSURANCETABLE',
    {
      BirthInsuranceId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      FatherName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      FatherIDNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      MotherName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      MotherIDNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      AloneName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      IDNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      BDaughter: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      BDIDNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      SDaughter: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      SDNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IsNum: {
        type: DataTypes.INTEGER,
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
  return BirthInsuranceTable;
};
