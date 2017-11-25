'use strict';

module.exports = function (sequelize, DataTypes) {

  var EnterpriseTable = sequelize.define('ENTERPRISETABLE',
    {
      EnterpriseId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      EnterpriseNumber: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      EnterpriseName: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Person: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Area: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Code: {
        type: DataTypes.STRING(1000),
        comment: ''
      },

      Activity: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      Category: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      State: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      Employee: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      Income: {
        type: DataTypes.STRING(1000),
        comment: ''
      },

      CountPerson: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(1000),
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

  return EnterpriseTable;
};
