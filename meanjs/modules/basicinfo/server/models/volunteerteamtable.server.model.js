'use strict';

module.exports = function (sequelize, DataTypes) {

  var VolunteerTeamTable = sequelize.define('VolunteerTeamTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '姓名'
      },
      sex: {
        type: DataTypes.STRING(10),
        defaultValue: '',
        comment: '性别'
      },
      birthday: {
        type: DataTypes.DATE,
        comment: '出生年月'
      },
      address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '家庭住址'
      },
      tel: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '联系电话'
      },
      reasonsforjoining: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '加入原因'
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
      comment: '红雁义工队表'
    }
  );

  return VolunteerTeamTable;
};
