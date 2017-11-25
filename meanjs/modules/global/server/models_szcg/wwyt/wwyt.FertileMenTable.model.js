'use strict';

module.exports = function (sequelize, DataTypes) {

  var FertileMenTable = sequelize.define('FERTILEMENTABLE',
    {
      MenId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      MenName: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      MenBirth: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      MenPlace: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      IDNumber: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Father: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Mother: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Education: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IsOnlyChild: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      IsFloating: {
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
      BelongGrid: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongId: {
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
  return FertileMenTable;
};
