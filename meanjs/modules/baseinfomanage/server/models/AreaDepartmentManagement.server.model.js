'use strict';

module.exports = function (sequelize, DataTypes) {

  var AreaDepartmentManagement = sequelize.define('AreaDepartmentManagement',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '社区、村'
      },
      party: {
        type: DataTypes.INTEGER,
        comment: '党建类型'
      },
      leader: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '责任领导'
      },
      chief: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '责任科长'
      },
      fzr: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '负责人'
      },
      tel: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '联系电话'
      }
    },
    {
      comment: '三级包抓机制表',
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
  return AreaDepartmentManagement;
};
