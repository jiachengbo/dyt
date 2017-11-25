'use strict';

module.exports = function (sequelize, DataTypes) {

  var BasicStationManagement = sequelize.define('BasicStationManagement',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '部门名称'
      },
      address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '办公地点'
      },
      fzr: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '负责人'
      },
      contact_information: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '联系方式'
      },
      email: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '邮箱'
      },
      remark: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '备注'
      }
    },
    {
      comment: '基层站所管理表'
    }
  );
  return BasicStationManagement;
};
