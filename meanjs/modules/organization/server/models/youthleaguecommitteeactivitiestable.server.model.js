'use strict';

module.exports = function (sequelize, DataTypes) {

  var YLC_activitiesTable = sequelize.define('YLC_activitiesTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      activitiesname: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '活动名称'
      },
      activitiestype: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '活动类型'
      },
      activitiespic: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '活动图片'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '文件路径'
      },
      activitiescontent: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: '活动内容'
      },
      activitiestime: {
        type: DataTypes.DATE,
        comment: '活动时间'
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
      comment: '团委活动表',
      indexes: [
        {
          fields: ['activitiestype']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.YLC_activitiesTypeTable,
            {foreignKey: 'activitiestype'});
        }
      }
    }
  );

  return YLC_activitiesTable;
};
