'use strict';

module.exports = function (sequelize, DataTypes) {

  var ThreeMasterMemberManagement = sequelize.define('ThreeMasterMemberManagement',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
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
      birth_date: {
        type: DataTypes.DATE,
        comment: '出生日期'
      },
      nation: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '民族'
      },
      education_degree: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '文化程度'
      },
      work_unit: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '工作单位及职务'
      },
      type_style: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '类型'
      },
      home_address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '家庭住址'
      },
      contact_information: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '联系方式'
      },
      community: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '所属社区'
      },
      grid: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '网格区域'
      }
    },
    {
      comment: '三长三员管理表',
      indexes: [
        {
          fields: ['community']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'community'});
        }
      }
    }
  );
  return ThreeMasterMemberManagement;
};
