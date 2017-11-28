'use strict';

module.exports = function (sequelize, DataTypes) {

  var ServiceYeTable = sequelize.define('SERVICEYETABLE',
    {
      ServiceId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ServiceName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ServiceYears: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ServiceMonths: {
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
      Number: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );

  return ServiceYeTable;
};
