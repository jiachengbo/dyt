'use strict';

module.exports = function (sequelize, DataTypes) {

  var YLO_table = sequelize.define('YLO_table',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      ylo_name: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '组织名称'
      },
      ylo_code: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '机构代码'
      },
      ylo_type: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '组织类别'
      },
      ylo_industrytype: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '行业类别'
      },
      ylo_secretary: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '书记'
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
      comment: '团组织表'
    }
  );

  return YLO_table;
};
