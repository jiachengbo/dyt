'use strict';

module.exports = function (sequelize, DataTypes) {

  var PartyOrganizationTable = sequelize.define('PartyOrganizationTable',
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
        comment: '支部名称'
      },
      established_time: {
        type: DataTypes.DATE,
        comment: '成立时间'
      },
      party_organization: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '上级党组织'
      },
      general_branch: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '上级党总支'
      },
      member_ship: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '隶属关系'
      },
      secretary: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '书记'
      },
      party_zhuangan: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党务专干'
      },
      concat_phone: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '联系电话'
      },
      concat_address: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '联系地址'
      },
      party_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '党员人数'
      },
      company_type: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '单位类别'
      },
      community: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '所在社区'
      },
      longitude: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '经度'
      },
      latitude: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '纬度'
      },
      condition_type: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '组织类别'
      },
      company_condition: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '组织所在单位情况'
      },
      company_name: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '单位名称'
      },
      organize_condition: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '单位建立组织情况'
      },
      code: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党组织所在单位代码'
      }
    },
    {
      comment: '党组织信息管理 表'
    }
  );

  return PartyOrganizationTable;
};
