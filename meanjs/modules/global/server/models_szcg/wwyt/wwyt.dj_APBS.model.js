'use strict';

module.exports = function (sequelize, DataTypes) {

  var dj_APBS = sequelize.define('DJ_APBS',
    {
      APBS_ID: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      createDate: {
        type: DataTypes.DATE,
        comment: ''
      },
      title: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      details: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      receiveUser: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      type: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      APBS_file: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      file_format: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      isPhoneDJ: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      current_PT_type: {
        type: DataTypes.INTEGER,
        comment: ''
      }
    }
  );

  return dj_APBS;
};
