'use strict';

module.exports = function (sequelize, DataTypes) {

  var PartyOrganizationReorganizationTable = sequelize.define('PartyOrganizationReorganizationTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '党组织名称'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      peoplenum: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '党员人数'
      },
      head: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        comment: '负责人'
      },
      tel: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        comment: '联系方式'
      },
      mainproblem: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '存在的主要问题'
      },
      Measures: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '整改措施'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '所属社区'
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
      comment: '软弱涣散党组织整顿表',
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

  return PartyOrganizationReorganizationTable;
};
