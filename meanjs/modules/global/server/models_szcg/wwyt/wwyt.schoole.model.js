'use strict';

module.exports = function (sequelize, DataTypes) {

  var schoole = sequelize.define('SCHOOLE',
    {
      organizationId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      schoolName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      studentCount: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      legalPerson: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      informationperson: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      jobCount: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      retireCount: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      superior: {
        type: DataTypes.STRING(100),
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

  return schoole;
};
