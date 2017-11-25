'use strict';

module.exports = function (sequelize, DataTypes) {

  var VolunteerInfoTable = sequelize.define('VOLUNTEERINFOTABLE',
    {
      VolunteerId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      VolunteerName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      sex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      IndentityCard: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      telNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunteerNo: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      RegisterDate: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      VolunType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ServeArea: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Blong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUserId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyUserId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(200),
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
  return VolunteerInfoTable;
};
