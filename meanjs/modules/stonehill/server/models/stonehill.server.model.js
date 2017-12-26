'use strict';

module.exports = function (sequelize, DataTypes) {

  var Stonehill = sequelize.define('Stonehill',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: 'title'
      },
      content: {
        type: DataTypes.STRING,
        comment: 'content'
      },
      photo: {
        type: DataTypes.STRING,
        comment: '图片'
      },
      file_path: {
        type: DataTypes.STRING,
        comment: '文件'
      },
      time: {
        type: DataTypes.DATE,
        comment: '时间'
      }
    },
    {
      comment: '他山之石 table'
    }
  );

  return Stonehill;
};
