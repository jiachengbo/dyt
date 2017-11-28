'use strict';

module.exports = function (sequelize, DataTypes) {

  var JULACTable = sequelize.define('JULACTable',
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
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: '',
        comment: '内容'
      },
      photos: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '图片'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      time: {
        type: DataTypes.DATE,
        comment: '活动时间'
      },
      tel: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        comment: '联系电话'
      },
      address: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '地址'
      },
      head: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '负责人'
      },
      headdepartment: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '负责部门'
      },
      peoplenum: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '参加人数'
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
      comment: '街道党建联席会表',
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

  return JULACTable;
};
