'use strict';

module.exports = function (sequelize, DataTypes) {

  var ManagementAccountingTable = sequelize.define('MANAGEMENTACCOUNTINGTABLE',
    {
      ManagementId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ManagementName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ManagementCode: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Management: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ManagementAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      ManagementPerson: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      ManagementTel: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Mangertype: {
        type: DataTypes.STRING(100),
        isimg: true,
        comment: ''
      },
      IsNum: {
        type: DataTypes.INTEGER,
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );

  return ManagementAccountingTable;
};
