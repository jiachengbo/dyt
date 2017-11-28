'use strict';

module.exports = function (sequelize, DataTypes) {

  var FertileWomanTable = sequelize.define('FERTILEWOMANTABLE',
    {
      FertileId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      FertileName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      FertileBirth: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      FertileNation: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      FertilePlace: {
        type: DataTypes.STRING(50),
        comment: ''
      },

      IDNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Father: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Mother: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Education: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MarryDate: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MarryStatus: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      IsOnlyChild: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      Contraceptive: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Mechanism: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      StartDate: {
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
  return FertileWomanTable;
};
