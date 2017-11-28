'use strict';

module.exports = function (sequelize, DataTypes) {

  var PlanProjectTable = sequelize.define('PLANPROJECTTABLE',
    {
      planId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      planName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      planFrom: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PlanContent: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      Status: {
        type: DataTypes.STRING(100),
        comment: ''
      },

      Person: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PlanTime: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PlanWork: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Num: {
        type: DataTypes.INTEGER,
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
  return PlanProjectTable;
};
