'use strict';

module.exports = function (sequelize, DataTypes) {
  //项目管理表
  var ProjectTable = sequelize.define('ProjectTable',
    {
      projectid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      projectname: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'projectname'
      },
      projecttype: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'projecttype'
      },
      projectlogo: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'projectlogo'
      },
      projectrank: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'projectrank'
      },
      source: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'source'
      },
      measure: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: 'measure'
      },
      projectsummary: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: 'projectsummary'
      },
      state: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'state'
      },
      reportingdepartmentid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'reportingdepartmentid'
      },
      sbtime: {
        type: DataTypes.DATE,
        comment: 'sbtime'
      },
      finishtime: {
        type: DataTypes.DATE,
        comment: 'finishtime'
      },
      people: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'people'
      },
      head: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'head'
      },
      company: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'company'
      },
      approveddepartment: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'approveddepartment'
      },
      approvedtime: {
        type: DataTypes.DATE,
        comment: 'approvedtime'
      },
      approvedstate: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'approvedstate'
      },
      knotstate: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'knotstate'
      },
      rejectcause: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: 'rejectcause'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'communityid'
      },
      isdelete: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'isdelete'
      },
      createuserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'createuserid'
      },
      createdate: {
        type: DataTypes.DATE,
        comment: 'createdate'
      },
      modifyUserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'modifyUserid'
      },
      modifydate: {
        type: DataTypes.DATE,
        comment: 'modifydate'
      }
    },
    {
      comment: 'ProjectTable'
    }
  );

  return ProjectTable;
};
