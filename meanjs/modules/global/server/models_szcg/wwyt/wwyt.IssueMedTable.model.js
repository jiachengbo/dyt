'use strict';

module.exports = function (sequelize, DataTypes) {

  var IssueMedTable = sequelize.define('ISSUEMEDTABLE',
    {
      MedId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      MedNumber: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      MedTime: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      MedPeople: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Belong: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return IssueMedTable;
};
