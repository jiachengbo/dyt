'use strict';

module.exports = function (sequelize, DataTypes) {

  var groupPetition = sequelize.define('GROUPPETITION',
    {
      groupPetitionId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      organizationIdId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      personNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      petitionType: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      dutyUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      dutySection: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      petitionObject: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      referObject: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      petitionContext: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      appeal: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      result: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      context: {
        type: DataTypes.STRING(2000),
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
      petitionName: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      goCapital: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      goProvince: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      goCity: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      basicCase: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      progress: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      Caseresult: {
        type: DataTypes.STRING(2000),
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

  return groupPetition;
};
