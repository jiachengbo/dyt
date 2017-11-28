'use strict';

module.exports = function (sequelize, DataTypes) {

  var CommCorrectPersonTable = sequelize.define('COMMCORRECTPERSONTABLE',
    {
      PersonId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      PersonName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Sex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Nation: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IdentityCard: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Birth: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      HealthCondition: {
        type: DataTypes.STRING(100),
        comment: ''
      },

      MarriageCondition: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Culture: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Address: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Charge: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PunishmentType: {
        type: DataTypes.STRING(400),
        comment: ''
      },
      Bondsman: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Deadline: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      CorrectType: {
        type: DataTypes.STRING(400),
        comment: ''
      },
      CorrectDeadline: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      BeginEndDate: {
        type: DataTypes.STRING(400),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(200),
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return CommCorrectPersonTable;
};
