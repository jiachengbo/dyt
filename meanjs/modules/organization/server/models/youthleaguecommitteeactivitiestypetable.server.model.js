'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var YLC_activitiesTypeTable = sequelize.define('YLC_activitiesTypeTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '活动类型名称'
      }
    },
    {
      comment: '团委活动类型常量表',
      classMethods: {
        associate: function (models) {
          this.hasMany(models.YLC_activitiesTable,
            {foreignKey: 'activitiestype', targetKey: 'id'});
        }
      }
    }
  );
  dbExtend.addBaseCode('YLC_activitiesTypeTable', {attributes: ['id', 'name']});
  return YLC_activitiesTypeTable;
};
