'use strict';

module.exports = function (sequelize, DataTypes) {

  var PartyMemberTable = sequelize.define('PartyMemberTable',
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
      nation: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '民族'
      },
      work_unit: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '工作单位'
      },
      birthday: {
        type: DataTypes.DATE,
        comment: '出生日期'
      },
      nation_place: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '籍贯'
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
      join_time: {
        type: DataTypes.DATE,
        comment: '入党时间'
      },
      party_type: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党员类别'
      },
      is_lost: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '是否失联'
      },
      lost_time: {
        type: DataTypes.DATE,
        comment: '失联日期'
      },
      is_float: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '是否流动党员'
      },
      float_trend: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '流动动向'
      },
      community: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '社区'
      },
      partytype: {
        type: DataTypes.INTEGER,
        comment: '所属党建'
      },
      party_branch: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '所在党支部'
      },
      conversion_time: {
        type: DataTypes.DATE,
        comment: '转正时间'
      },
      party_state: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '党籍状态'
      },
      remark: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '备注'
      }
    },
    {
      comment: '党员基础信息管理 表',
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

  return PartyMemberTable;
};
