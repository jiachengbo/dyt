'use strict';

module.exports = function (sequelize, DataTypes) {

  var FertileChildTable = sequelize.define('FERTILECHILDTABLE',
    {
      ChildId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ChildName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ChildSex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      ChildBirth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Account: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Education: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Policy: {
        type: DataTypes.STRING(100),
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
      Blood: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      ChildNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IsFloat: {
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
  return FertileChildTable;
};
