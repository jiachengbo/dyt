'use strict';

module.exports = function (sequelize, DataTypes) {

  var StreetMemberTable = sequelize.define('StreetMemberTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '姓名'
      },
      sex: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '性别'
      },
      duty: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '职务'
      },
      work_unit: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '工作单位'
      },
      type_style: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '类型'
      },
      photo: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '人员照片'
      },
      remark: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '备注'
      }
    },
    {
      comment: '街道班子成员管理 表'
    }
  );

  return StreetMemberTable;
};
