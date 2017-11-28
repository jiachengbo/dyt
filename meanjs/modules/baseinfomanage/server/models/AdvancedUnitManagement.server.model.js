'use strict';

module.exports = function (sequelize, DataTypes) {

  var AdvancedUnitManagement = sequelize.define('AdvancedUnitManagement',
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
        comment: '单位名称'
      },
      level: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '级别'
      },
      first_declare: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '初次申报'
      },
      last_expired: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '上次届满'
      },
      addrss: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '地址'
      },
      fzr: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '负责人'
      },
      charge_leader: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '分管领导'
      },
      full_time_cadre: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '专干'
      }
    },
    {
      comment: '文明单位管理表'
    }
  );
  return AdvancedUnitManagement;
};
