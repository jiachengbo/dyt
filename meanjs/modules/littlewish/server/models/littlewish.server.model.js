'use strict';

module.exports = function (sequelize, DataTypes) {

  var Littlewish = sequelize.define('Littlewish',
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
      fbperson: {
        type: DataTypes.STRING,
        comment: '发布人'
      },
      fbtime: {
        type: DataTypes.DATE,
        comment: '发布时间'
      },
      community: {
        type: DataTypes.STRING,
        comment: '社区'
      },
      content: {
        type: DataTypes.STRING,
        comment: '心愿内容'
      },
      state: {
        type: DataTypes.STRING,
        comment: '心愿状态'
      },
      claimperson: {
        type: DataTypes.STRING,
        comment: '认领人'
      }
    },
    {
      comment: '微心愿表'
    }
  );

  return Littlewish;
};
