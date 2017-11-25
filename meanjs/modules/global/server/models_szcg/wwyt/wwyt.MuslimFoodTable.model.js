'use strict';

module.exports = function (sequelize, DataTypes) {

  var MuslimFoodTable = sequelize.define('MUSLIMFOODTABLE',
    {
      FoodId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      FoodName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      operateProperties: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      operateProject: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      operateScale: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      employeeNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Head: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Blong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Image: {
        type: DataTypes.STRING(500),
        isimg: true,
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
  return MuslimFoodTable;
};
