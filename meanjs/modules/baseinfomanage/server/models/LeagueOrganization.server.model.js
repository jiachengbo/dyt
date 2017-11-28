'use strict';

module.exports = function (sequelize, DataTypes) {

  var LeagueOrganizationTable = sequelize.define('LeagueOrganizationTable',
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
        comment: '团组织名称'
      },
      code: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '团组织机构代码'
      },
      organization_type: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '组织类别'
      },
      trade_type: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '行业类别'
      },
      secretary: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '书记'
      }
    },
    {
      comment: '团组织管理 表'
    }
  );

  return LeagueOrganizationTable;
};
