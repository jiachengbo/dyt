'use strict';

module.exports = function (sequelize, DataTypes) {

  var ResidentPartyTable = sequelize.define('RESIDENTPARTYTABLE',
    {
      ResidentPartyId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ResidentPartyName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ResidentPartyNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Secretary: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Head: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Address: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      BelongGrid: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );

  return ResidentPartyTable;
};
