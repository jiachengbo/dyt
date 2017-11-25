'use strict';

module.exports = function (sequelize, DataTypes) {

  var ProjectTable = sequelize.define('PROJECTTABLE',
    {
      ProjectId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ProjectName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ProjectSummary: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      ProjectLogo: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      ProjectRank: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      Source: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ProjectType: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Measure: {
        type: DataTypes.STRING(650),
        comment: ''
      },
      People: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SbTime: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      FinishTime: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Head: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      State: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Studies: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Report: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      company: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      refuse: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      ApprovedTime: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      YearTime: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      approvedDepartment: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ispast: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      isfinish: {
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
      isStreet: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      is_syn: {
        type: DataTypes.INTEGER,
        comment: ''
      }
    }
  );

  return ProjectTable;
};
