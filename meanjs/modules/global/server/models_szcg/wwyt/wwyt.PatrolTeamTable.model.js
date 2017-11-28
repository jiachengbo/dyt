'use strict';

module.exports = function (sequelize, DataTypes) {

  var PatrolTeamTable = sequelize.define('PATROLTEAMTABLE',
    {
      PatrolId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      PatrolName: {
        type: DataTypes.STRING(100),
        isimg: true,
        comment: ''
      },
      PatrolSex: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PatrolBirth: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PatrolIdentity: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PatrolAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      PatrolTel: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      PatrolAero: {
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
  return PatrolTeamTable;
};
