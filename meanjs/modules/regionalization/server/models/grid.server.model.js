'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var GridTable = sequelize.define('GridTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '社区村名称'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '社区名称'
      }
    },
    {
      comment: '网格常量表',
      classMethods: {
        associate: function (models) {
          this.hasMany(models.DynamicTable,
            {foreignKey: 'gridid', targetKey: 'id'});
        }
      }
    }
  );
  dbExtend.addBaseCode('GridTable', {attributes: ['id', 'name', 'communityid']});
  return GridTable;
};
