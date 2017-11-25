'use strict';

module.exports = function (sequelize, DataTypes) {

  var CaseMediateTable = sequelize.define('CASEMEDIATETABLE',
    {
      CaseId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      CaseType: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      RecoverFilesDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Organizer: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Undertaker: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Identitys: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Proposer: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      BProposer: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MediateCondition: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongGrid: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return CaseMediateTable;
};
