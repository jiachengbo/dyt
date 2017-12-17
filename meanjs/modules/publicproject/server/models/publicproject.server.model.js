'use strict';

module.exports = function (sequelize, DataTypes) {

  var Publicproject = sequelize.define('Publicproject',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      starlevel: {
        type: DataTypes.INTEGER,
        comment: '星级'
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: 'title'
      },
      photo: {
        type: DataTypes.STRING,
        comment: '照片'
      },
      intro: {
        type: DataTypes.STRING,
        comment: '简介'
      },
      projectsource: {
        type: DataTypes.INTEGER,
        comment: '项目来源'
      },
      sbtime: {
        type: DataTypes.DATE,
        comment: '申报时间'
      },
      projecttype: {
        type: DataTypes.STRING,
        comment: '项目类型'
      },
      benefitnum: {
        type: DataTypes.INTEGER,
        comment: '受益人数'
      },
      endtime: {
        type: DataTypes.DATE,
        comment: '完成时间'
      },
      claimunit: {
        type: DataTypes.STRING,
        comment: '认领单位'
      },
      claimperson: {
        type: DataTypes.STRING,
        comment: '认领人'
      },
      chargeperson: {
        type: DataTypes.STRING,
        comment: '负责人'
      },
      measure: {
        type: DataTypes.STRING,
        comment: '项目推进措施'
      },
      file_path: {
        type: DataTypes.STRING,
        comment: '文件'
      },
      community: {
        type: DataTypes.STRING,
        comment: '社区'
      }
    },
    {
      comment: '项目公示表'
    }
  );

  return Publicproject;
};
