'use strict';

module.exports = function (sequelize, DataTypes) {

  var VolunteerTable = sequelize.define('VOLUNTEERTABLE',
    {
      VolunteerId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      VolunteerName: {
        type: DataTypes.STRING(100),
        isimg: true,
        comment: ''
      },
      VolunteerSex: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerBirth: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerIdentity: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerOutlook: {
        type: DataTypes.STRING(100),
        comment: ''
      },

      VolunteerCompany: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerPost: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerGrid: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      VolunteerAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      VolunteerTel: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
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
  return VolunteerTable;
};
