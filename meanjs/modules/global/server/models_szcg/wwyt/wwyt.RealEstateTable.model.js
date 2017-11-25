'use strict';

module.exports = function (sequelize, DataTypes) {

  var RealEstateTable = sequelize.define('REALESTATETABLE',
    {
      RealId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      RealName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      RealYears: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Months: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MonthsFinish: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Total: {
        type: DataTypes.STRING(100),
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
      community: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      GridID: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Sales: {
        type: DataTypes.STRING(500),
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

  return RealEstateTable;
};
