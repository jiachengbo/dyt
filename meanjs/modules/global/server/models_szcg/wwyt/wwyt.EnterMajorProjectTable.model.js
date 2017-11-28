'use strict';

module.exports = function (sequelize, DataTypes) {

  var EnterMajorProjectTable = sequelize.define('ENTERMAJORPROJECTTABLE',
    {
      ProId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ProName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Buildcontent: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      BuildUnitPhone: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      PersonName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Post: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      DepartmentHeadPhone: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Remark: {
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

  return EnterMajorProjectTable;
};
