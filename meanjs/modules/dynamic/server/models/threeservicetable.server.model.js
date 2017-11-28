'use strict';

module.exports = function (sequelize, DataTypes) {

  var ThreeServiceTable = sequelize.define('ThreeServiceTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '标题'
      },
      photos: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '照片'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      content: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '内容'
      },
      type: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '类型'
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
      comment: '三务公开表',
      indexes: [
        {
          fields: ['type', 'communityid']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.ThreeServiceTypeTable,
            {foreignKey: 'type'});
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'communityid'});
        }
      }
    }
  );

  return ThreeServiceTable;
};
