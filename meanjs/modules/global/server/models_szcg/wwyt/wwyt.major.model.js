'use strict';

module.exports = function (sequelize, DataTypes) {

  var major = sequelize.define('MAJOR',
    {
      organizationId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      proName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      developer: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      developerUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      developerTel: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      construction: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      constructionUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      constructionTel: {
        type: DataTypes.STRING(50),
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

  return major;
};
