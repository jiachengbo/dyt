'use strict';

module.exports = function (sequelize, DataTypes) {

  var party = sequelize.define('PARTY',
    {
      personId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      JoinTime: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      JoinClub: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      WorkPlace: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Category: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(50),
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

  return party;
};
