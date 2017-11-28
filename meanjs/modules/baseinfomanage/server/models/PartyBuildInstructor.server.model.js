'use strict';

module.exports = function (sequelize, DataTypes) {

  var PartyBuildInstructorTable = sequelize.define('PartyBuildInstructorTable',
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
        comment: '名称'
      },
      type_style: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '类别'
      },
      member_number: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '职工人数'
      },
      mass_organization: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '群团组织'
      },
      business_contact: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '企业联系人'
      },
      contact_number: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '企业联系人联系电话'
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '地址'
      },
      build_instructor: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党建指导员'
      },
      instructor_number: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党建指导员联系电话'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '所属社区'
      },
      party: {
        type: DataTypes.INTEGER,
        comment: '党建类型'
      }
    },
    {
      comment: '党建指导员管理 表',
      indexes: [
        {
          fields: ['communityid']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'communityid'});
        }
      }
    }
  );

  return PartyBuildInstructorTable;
};
