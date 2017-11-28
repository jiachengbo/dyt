'use strict';

module.exports = function (sequelize, DataTypes) {
  //项目进展表
  var ProgressTable = sequelize.define('ProgressTable',
    {
      progressid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      projectid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'progress_table'
      },
      progresstime: {
        type: DataTypes.DATE,
        comment: 'progresstime'
      },
      progresscontent: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: 'progresscontent'
      },
      progressphoto: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'progressphoto'
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
      comment: 'ProgressTable'
    }
  );

  return ProgressTable;
};
