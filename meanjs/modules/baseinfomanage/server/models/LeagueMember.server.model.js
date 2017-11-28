'use strict';

module.exports = function (sequelize, DataTypes) {

  var LeagueMemberTable = sequelize.define('LeagueMemberTable',
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
      nation: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '民族'
      },
      sex: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '性别'
      },
      birthday: {
        type: DataTypes.DATE,
        comment: '出生日期'
      },
      id_card: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '身份证号'
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '电话号码'
      },
      league_branch: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '所在团支部'
      },
      community: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '社区'
      },
      education: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '学历'
      },
      join_time: {
        type: DataTypes.DATE,
        comment: '入团时间'
      },
      politics_status: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '政治面貌'
      },
      is_local: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '是否本县区从业'
      },
      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '电子邮箱'
      }
    },
    {
      comment: '团员管理 表'
    }
  );

  return LeagueMemberTable;
};
