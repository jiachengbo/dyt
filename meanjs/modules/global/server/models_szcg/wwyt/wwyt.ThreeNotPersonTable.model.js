'use strict';

module.exports = function (sequelize, DataTypes) {

  var ThreeNotPersonTable = sequelize.define('THREENOTPERSONTABLE',
    {
      PersonId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      PersonName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Sex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      age: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CardId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Detailaddress: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      HouseHoldaddress: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ApplyTime: {
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
  return ThreeNotPersonTable;
};
