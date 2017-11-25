'use strict';

module.exports = function (sequelize, DataTypes) {

  var StreetDynamicsTable = sequelize.define('StreetDynamicsTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '标题'
      },
      photos: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '照片'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: '',
        comment: '内容'
      },
      time: {
        type: DataTypes.DATE,
        comment: '时间'
      },
      ispush: {
        type: DataTypes.STRING(10),
        defaultValue: '',
        comment: '是否推送首页'
      },
      remarks: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: '备注'
      },
      createuserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '创建人ID'
      },
      createdate: {
        type: DataTypes.DATE,
        comment: '创建时间'
      }
    },
    {
      comment: '街道动态表'
    }
  );

  return StreetDynamicsTable;
};
