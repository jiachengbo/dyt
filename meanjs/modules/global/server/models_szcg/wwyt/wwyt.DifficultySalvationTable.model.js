'use strict';

module.exports = function (sequelize, DataTypes) {

  var DifficultySalvationTable = sequelize.define('DIFFICULTYSALVATIONTABLE',
    {
      DepartedId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      DepartedName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Sex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      age: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      CardId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DieTime: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ProposerName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ProposerTel: {
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
  return DifficultySalvationTable;
};
