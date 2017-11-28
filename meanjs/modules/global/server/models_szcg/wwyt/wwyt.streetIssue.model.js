'use strict';

module.exports = function (sequelize, DataTypes) {

  var streetIssue = sequelize.define('STREETISSUE',
    {
      streetIssueId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      issueObjectType: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      issueObject: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      issueAddress: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      issueContext: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      issueType: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      issueTypeDetail: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      status: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      receiveUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      receiveDepartment: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      method: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      result: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      beforepic: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      afterpic: {
        type: DataTypes.STRING(200),
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
      createDepartment: {
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
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      gridId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      roadId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      lat: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      lng: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      stick: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      awardType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      source: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      video: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      Beforepic2: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Beforepic3: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Afterpic2: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      is_ZWJMsyn: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      ZWJMId: {
        type: DataTypes.INTEGER,
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
  return streetIssue;
};
