'use strict';

module.exports = function (sequelize, DataTypes) {

  var enterprise = sequelize.define('ENTERPRISE',
    {
      organizationId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      organizationName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      belong: {
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
      peopleNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      informationperson: {
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

  return enterprise;
};
