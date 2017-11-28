'use strict';

module.exports = function (sequelize, DataTypes) {

  var GuaranteeHouseFamilyTable = sequelize.define('GUARANTEEHOUSEFAMILYTABLE',
    {
      FamilyId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      FamilyName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      FamilyCardNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      FamilyPopNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      MonthMoney: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SumMoney: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      HouseArea: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      registerState: {
        type: DataTypes.STRING(100),
        comment: ''
      },

      transactionStage: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      GuaranteeType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      reportState: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      GuaranteeState: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
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
  return GuaranteeHouseFamilyTable;
};
