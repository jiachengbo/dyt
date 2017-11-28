'use strict';

module.exports = function (sequelize, DataTypes) {

  var personPetition = sequelize.define('PERSONPETITION',
    {
      personPetitionId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      personId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      petitionType: {
        type: DataTypes.STRING(100),
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
        type: DataTypes.STRING(100),
        comment: ''
      },
      referObject: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      petitionContext: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      appeal: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      result: {
        type: DataTypes.STRING(500),
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

  return personPetition;
};
