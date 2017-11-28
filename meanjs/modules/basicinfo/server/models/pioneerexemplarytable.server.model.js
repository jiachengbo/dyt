'use strict';

module.exports = function (sequelize, DataTypes) {

  var PioneerExemplaryTable = sequelize.define('PioneerExemplaryTable',
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
        comment: '姓名'
      },
      sex: {
        type: DataTypes.STRING(10),
        defaultValue: '',
        comment: '性别'
      },
      jurisdictions: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '所在辖区'
      },
      deeds: {
        type: DataTypes.STRING(10000),
        defaultValue: '',
        comment: '模范事迹'
      },
      time: {
        type: DataTypes.DATE,
        comment: '时间'
      },
      photos: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '照片'
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
      type: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '先锋事迹'
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
      comment: '领头雁表',
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

  return PioneerExemplaryTable;
};
