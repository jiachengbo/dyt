'use strict';

module.exports = function (sequelize, DataTypes) {

  var BaseStationTable = sequelize.define('BASESTATIONTABLE',
    {
      BaseStationId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      sectionId: {
        type: DataTypes.STRING(50),
        isimg: true,
        comment: ''
      },
      DepartmentName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      Head: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Email: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Detail: {
        type: DataTypes.STRING(500),
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
  return BaseStationTable;
};
