'use strict';

module.exports = function (sequelize, DataTypes) {

  var ApplyNow = sequelize.define('ApplyNow',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '姓名'
      },
      gender: {
        type: DataTypes.STRING,
        comment: '性别'
      },
      phoneNumber: {
        type: DataTypes.STRING,
        comment: '联系方式'
      },
      idcard: {
        type: DataTypes.STRING,
        comment: '身份证号'
      },
      zhibu: {
        type: DataTypes.STRING,
        comment: '所在支部'
      },
      mingzu: {
        type: DataTypes.STRING,
        comment: '民族'
      },
      partytime: {
        type: DataTypes.DATE,
        comment: '入党时间'
      },
      brith: {
        type: DataTypes.DATE,
        comment: '出生日期'
      },
      danwei: {
        type: DataTypes.STRING,
        comment: '工作单位'
      },
      adress: {
        type: DataTypes.STRING,
        comment: '家庭住址'
      },
      zhuangtai: {
        type: DataTypes.STRING,
        comment: '预约状态'
      },
      partymoney: {
        type: DataTypes.INTEGER,
        comment: '党费'
      },
      jiguan: {
        type: DataTypes.STRING,
        comment: '籍贯'
      }
    },
    {
      comment: 'applyNow table'
    }
  );

  return ApplyNow;
};
