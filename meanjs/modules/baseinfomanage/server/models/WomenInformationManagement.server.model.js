'use strict';

module.exports = function (sequelize, DataTypes) {

  var WomenInformationManagement = sequelize.define('WomenInformationManagement',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      title: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '标题'
      },
      type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '类型'
      },
      photo: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '照片'
      },
      time_update: {
        type: DataTypes.DATE,
        comment: '时间'
      },
      remark: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '备注'
      },
      file_path: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '文件路径'
      },
      file_content: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '内容'
      }
    },
    {
      comment: '妇联信息管理表'
    }
  );
  return WomenInformationManagement;
};
