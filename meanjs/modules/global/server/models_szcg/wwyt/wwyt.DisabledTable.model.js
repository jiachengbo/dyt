'use strict';

module.exports = function (sequelize, DataTypes) {

  var DisabledTable = sequelize.define('DISABLEDTABLE',
    {
      DisabledId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      DisabledName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      DisabledSex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      DisabledBirth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DisabledType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DisabledNo: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      remark: {
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
      BlongGrid: {
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
  return DisabledTable;
};
