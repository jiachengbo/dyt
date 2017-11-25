'use strict';
var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {
  //重点工作动态常量表
  var KeyWorkTypeConstant = sequelize.define('KeyWorkTypeConstant',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '名字'
      }
    },
    {
      comment: 'KeyWorkTypeConstant',
      classMethods: {
        associate: function (models) {
          this.hasMany(models.KeyWorkTable,
            {foreignKey: 'typeId', targetKey: 'id'});
        }
      }
    }
  );
  dbExtend.addBaseCode('KeyWorkTypeConstant', {attributes: ['id', 'name']});
  return KeyWorkTypeConstant;
};
