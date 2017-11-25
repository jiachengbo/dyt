'use strict';

module.exports = function (sequelize, DataTypes) {

  var ProfessionalGradingTable = sequelize.define('ProfessionalGradingTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '标题'
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
      jurisdiction: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '所在辖区'
      },
      head: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        comment: '负责人'
      },
      time: {
        type: DataTypes.DATE,
        comment: '时间'
      },
      remarks: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '备注'
      },
      createuserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '创建人ID'
      },
      party: {
        type: DataTypes.INTEGER,
        comment: '党建类型'
      },
      createdate: {
        type: DataTypes.DATE,
        comment: '创建时间'
      }
    },
    {
      comment: '职业水平认证表'
    }
  );

  return ProfessionalGradingTable;
};
