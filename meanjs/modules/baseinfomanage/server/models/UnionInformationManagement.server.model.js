'use strict';

module.exports = function (sequelize, DataTypes) {

  var UnionInformationManagement = sequelize.define('UnionInformationManagement',
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
        comment: '名称'
      },
      union_code: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '工会编码'
      },
      approval_number: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '年批文号'
      },
      member_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '会员人数'
      },
      employees_num: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '职工人数'
      },
      migrant_workers: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '农民工'
      },
      address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '地址'
      },
      chairman_name: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '主席名称'
      },
      contact_information: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '联系方式'
      }
    },
    {
      comment: '工会信息管理表'
    }
  );
  return UnionInformationManagement;
};
