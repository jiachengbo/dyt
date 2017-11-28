'use strict';

module.exports = function (sequelize, DataTypes) {
  //党建需求表
  var DynamicTable = sequelize.define('DynamicTable',
    {
      dynamicid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      dynamictitle: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'dynamictitle'
      },
      dynamiccontext: {
        type: DataTypes.STRING(2000),
        defaultValue: '',
        comment: 'dynamiccontext'
      },
      state: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'state'
      },
      streetid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'streetid'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'communityid'
      },
      gridid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'gridid'
      },
      type: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'type'
      },
      photoone: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'photoone'
      },
      phototwo: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'phototwo'
      },
      photothree: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'photothree'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件'
      },
      hf_time: {
        type: DataTypes.DATE,
        comment: 'hf_time'
      },
      hf_text: {
        type: DataTypes.STRING(800),
        defaultValue: '',
        comment: 'hf_text'
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
      }
    },
    {
      comment: 'DynamicTable',
      indexes: [
        {
          fields: ['communityid']
        },
        {
          fields: ['gridid']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'communityid'});
          this.belongsTo(models.GridTable,
            {foreignKey: 'gridid'});
        }
      }
    }
  );

  return DynamicTable;
};
