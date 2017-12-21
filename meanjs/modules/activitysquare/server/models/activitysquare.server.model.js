'use strict';

module.exports = function (sequelize, DataTypes) {

  var Activitysquare = sequelize.define('Activitysquare',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        comment: '标题'
      },
      hostunit: {
        type: DataTypes.STRING,
        comment: '主办单位'
      },
      underunit: {
        type: DataTypes.STRING,
        comment: '承办单位'
      },
      fbtime: {
        type: DataTypes.DATE,
        comment: '发布时间'
      },
      starttime: {
        type: DataTypes.DATE,
        comment: '开始时间'
      },
      endtime: {
        type: DataTypes.DATE,
        comment: '结束时间'
      },
      address: {
        type: DataTypes.STRING,
        comment: '活动地点'
      },
      peoplenum: {
        type: DataTypes.INTEGER,
        comment: '活动人数'
      },
      applytime: {
        type: DataTypes.DATE,
        comment: '报名时间'
      },
      applyendtime: {
        type: DataTypes.DATE,
        comment: '报名截止时间'
      },
      file_path: {
        type: DataTypes.STRING,
        comment: '详情（文件）'
      }
    },
    {
      comment: '活动广场表'
    }
  );

  return Activitysquare;
};
