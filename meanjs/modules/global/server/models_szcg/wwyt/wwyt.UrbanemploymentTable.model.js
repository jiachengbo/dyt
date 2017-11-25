'use strict';

module.exports = function (sequelize, DataTypes) {

  var UrbanemploymentTable = sequelize.define('URBANEMPLOYMENTTABLE',
    {
      employmentId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      employmentName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      employmentSex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      employmentEducational: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      employmentNo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      employmentType: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      registerType: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      byyx: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      jydw: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      grid: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
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
  return UrbanemploymentTable;
};
