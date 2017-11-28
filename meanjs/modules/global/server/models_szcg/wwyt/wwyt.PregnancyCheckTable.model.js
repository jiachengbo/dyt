'use strict';

module.exports = function (sequelize, DataTypes) {

  var PregnancyCheckTable = sequelize.define('PREGNANCYCHECKTABLE',
    {
      CheckId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      WifeName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      WifeAge: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      HandsomeName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      HandsomeAge: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Tel: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Result: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Date: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Grid: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return PregnancyCheckTable;
};
