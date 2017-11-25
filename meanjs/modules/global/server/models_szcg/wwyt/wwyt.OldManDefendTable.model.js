'use strict';

module.exports = function (sequelize, DataTypes) {

  var OldManDefendTable = sequelize.define('OLDMANDEFENDTABLE',
    {
      OldManId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      OldManName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OldManSex: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      OldManNo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OldManNation: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OldManStatus: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OldManAddress: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Disabled: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IsEnjoy: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      personTime: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      PayStation: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongGird: {
        type: DataTypes.STRING(200),
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return OldManDefendTable;
};
