'use strict';
var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));
module.exports = function (sequelize, DataTypes) {

  var ThreeServiceTypeTable = sequelize.define('ThreeServiceTypeTable',
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
        comment: '类型名称'
      }
    },
    {
      comment: '三务公开类型表',
      classMethods: {
        associate: function (models) {
          this.hasMany(models.ThreeServiceTable,
            {foreignKey: 'type', targetKey: 'id'});
        }
      }
    }
  );
  dbExtend.addBaseCode('ThreeServiceTypeTable', {attributes: ['id', 'name']});
  return ThreeServiceTypeTable;
};
