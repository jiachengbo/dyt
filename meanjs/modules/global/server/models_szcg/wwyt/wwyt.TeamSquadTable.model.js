'use strict';

module.exports = function (sequelize, DataTypes) {

  var TeamSquadTable = sequelize.define('TEAMSQUADTABLE',
    {
      SquadId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      SquadName: {
        type: DataTypes.STRING(100),
        isimg: true,
        comment: ''
      },
      SquadSex: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SquadBirth: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SquadIdentity: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      BelongTeam: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SquadAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      SquadTel: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      SquadAero: {
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
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      BelongGrid: {
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
  return TeamSquadTable;
};
