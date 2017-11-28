'use strict';

module.exports = function (sequelize, DataTypes) {

  var TradeTable = sequelize.define('TRADETABLE',
    {
      TradeId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      TradeName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TradeYears: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TradeMonths: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      AddFinish: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TongBi: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ThisMonths: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      YearFinish: {
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );

  return TradeTable;
};
