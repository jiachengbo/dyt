'use strict';

module.exports = function (sequelize, DataTypes) {

  var Littlewish = sequelize.define('Littlewish',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: 'title'
      },
      tel: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '发布人电话'
      },
      fbperson: {
        type: DataTypes.STRING,
        comment: '发布人'
      },
      IDcard: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '发布人身份证号'
      },
      fbtime: {
        type: DataTypes.DATE,
        comment: '发布时间'
      },
      community: {
        type: DataTypes.STRING,
        comment: '社区'
      },
      content: {
        type: DataTypes.STRING,
        comment: '心愿内容'
      },
      state: {
        type: DataTypes.STRING,
        comment: '心愿状态'
      },
      claimperson: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '认领人'
      },
      claimpersonID: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '认领人身份证号'
      }
    },
    {
      comment: '微心愿表',
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

  return Littlewish;
};
