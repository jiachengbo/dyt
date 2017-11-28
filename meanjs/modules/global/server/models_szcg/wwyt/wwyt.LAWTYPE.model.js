'use strict';

module.exports = function (sequelize, DataTypes) {

  var LAWTYPE = sequelize.define('LAWTYPE',
    {
      lawTypeId: {
        type: DataTypes.STRING(50),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      lawTypeName: {
        type: DataTypes.STRING(1000),
        isimg: true,
        comment: ''
      },
      lawTypeMark: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      context: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return LAWTYPE;
};
