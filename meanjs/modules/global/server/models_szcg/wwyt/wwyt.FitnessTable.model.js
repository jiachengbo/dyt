'use strict';

module.exports = function (sequelize, DataTypes) {

  var FitnessTable = sequelize.define('FITNESSTABLE',
    {
      FitnessId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      FintnessType: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Place: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Blong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      brand: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      buildYear: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Number: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      isQuality: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DamageNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      disposeResult: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      remark: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Image: {
        type: DataTypes.STRING(200),
        isimg: true,
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
  return FitnessTable;
};
