'use strict';

module.exports = function (sequelize, DataTypes) {

  var ArchitectureTable = sequelize.define('ARCHITECTURETABLE',
    {
      ArchitectureId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ArchitectureName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ArchitectureYears: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ArchitectureMonths: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Target: {
        type: DataTypes.STRING(100),
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
      community: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      GridID: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      lastyearFinish: {
        type: DataTypes.STRING(500),
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

  return ArchitectureTable;
};
