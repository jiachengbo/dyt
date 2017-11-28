'use strict';

module.exports = function (sequelize, DataTypes) {

  var AgainTable = sequelize.define('AGAINTABLE',
    {
      AgainId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      AgainName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      UpTime: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Result: {
        type: DataTypes.STRING(100),
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
      IsHandle: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Status: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      IsNumber: {
        type: DataTypes.INTEGER,
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
  return AgainTable;
};
