'use strict';

module.exports = function (sequelize, DataTypes) {
  //重点工作动态表
  var KeyWorkTable = sequelize.define('KeyWorkTable',
    {
      keyworkid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'title'
      },
      content: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: 'content'
      },
      type: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'type'
      },
      typeId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'typeId'
      },
      partytype: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '党建类型'
      },
      photo: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'photo'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      starttime: {
        type: DataTypes.DATE,
        comment: 'starttime'
      },
      endtime: {
        type: DataTypes.DATE,
        comment: 'endtime'
      },
      departmentid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'departmentid'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '社区ID'
      },
      head: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '负责人'
      },
      peoplenum: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'peoplenum'
      },
      remarks: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: 'remarks'
      },
      isdelete: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'isdelete'
      },
      createuserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'createuserid'
      },
      createdate: {
        type: DataTypes.DATE,
        comment: 'createdate'
      },
      modifyUserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'modifyUserid'
      },
      modifydate: {
        type: DataTypes.DATE,
        comment: 'modifydate'
      },
      phone: {
        type: DataTypes.STRING(20),
        defaultValue: '',
        comment: 'phone'
      },
      address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'address'
      }
    },
    {
      comment: 'KeyWorkTable',
      indexes: [
        {
          fields: ['communityid', 'typeId']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'communityid'});
          this.belongsTo(models.KeyWorkTypeConstant,
            {foreignKey: 'typeId'});
        }
      }
    }
  );

  return KeyWorkTable;
};
