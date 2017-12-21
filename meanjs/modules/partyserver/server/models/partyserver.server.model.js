'use strict';

module.exports = function (sequelize, DataTypes) {

  var Partyserver = sequelize.define('Partyserver',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      department: {
        type: DataTypes.STRING,
        comment: '部门'
      },
      photo: {
        type: DataTypes.STRING,
        comment: '照片'
      },
      workduty: {
        type: DataTypes.STRING,
        comment: '工作职责'
      },
      file_path: {
        type: DataTypes.STRING,
        comment: '内容（文件格式）'
      }
    },
    {
      comment: '党群服务表'
    }
  );

  return Partyserver;
};
