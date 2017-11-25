'use strict';

module.exports = function (sequelize, DataTypes) {

  var EnterCommunityTable = sequelize.define('EnterCommunityTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '标题'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: '',
        comment: '内容'
      },
      jurisdiction: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '所在辖区'
      },
      head: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        comment: '负责人'
      },
      time: {
        type: DataTypes.DATE,
        comment: '时间'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '所属社区'
      },
      remarks: {
        type: DataTypes.STRING(5000),
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
      comment: '在职党员进社区表',
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

  return EnterCommunityTable;
};
