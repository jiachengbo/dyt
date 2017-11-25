'use strict';

module.exports = function (sequelize, DataTypes) {

  var IndustryTable = sequelize.define('INDUSTRYTABLE',
    {
      IndustryId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      IndustryName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IndustryYears: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IndustryMonths: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Finish: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      AddFinish: {
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

  return IndustryTable;
};
