'use strict';

module.exports = function (sequelize, DataTypes) {

  var FirstChildTable = sequelize.define('FIRSTCHILDTABLE',
    {
      FirstId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ChildName: {
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
      Status: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IsHandle: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return FirstChildTable;
};
