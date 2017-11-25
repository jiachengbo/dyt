'use strict';

module.exports = function (sequelize, DataTypes) {

  var LetHouseTable = sequelize.define('LETHOUSETABLE',
    {
      LetId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      MasterName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CardId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Address: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },

      Grid: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Area: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Propertys: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Types: {
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
      LesseeName: {
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

  return LetHouseTable;
};
