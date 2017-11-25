'use strict';

module.exports = function (sequelize, DataTypes) {

  var dj_ZCJD = sequelize.define('DJ_ZCJD',
    {
      ZCJD_ID: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      createDate: {
        type: DataTypes.DATE,
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      details: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      answerUser: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      answer: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      type: {
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
      }
    }
  );

  return dj_ZCJD;
};
