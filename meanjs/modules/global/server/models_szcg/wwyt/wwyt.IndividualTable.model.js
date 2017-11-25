'use strict';

module.exports = function (sequelize, DataTypes) {

  var IndividualTable = sequelize.define('INDIVIDUALTABLE',
    {
      IndividualId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      IndividualNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IndividualName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IndividualAreaName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      Address: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Employee: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Activity: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Code: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IsDealWith: {
        type: DataTypes.INTEGER,
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

  return IndividualTable;
};
