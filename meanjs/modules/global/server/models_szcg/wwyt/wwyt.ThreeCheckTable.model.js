'use strict';

module.exports = function (sequelize, DataTypes) {

  var ThreeCheckTable = sequelize.define('THREECHECKTABLE',
    {
      personId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      CheckName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CheckCard: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      BirthDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      HJaddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      NowAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      HouKouType: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      BiYunWay: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      TenEndDate: {
        type: DataTypes.STRING(500),
        comment: ''
      },


      Types: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CheckHuanResult: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CheckYunResult: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CheckDiseaseResult: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      CheckQuarter: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      CheckDate: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      CheckDocter: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      CheckType: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      BelongAddress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Detail: {
        type: DataTypes.STRING(500),
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
      Belong: {
        type: DataTypes.STRING(200),
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
  return ThreeCheckTable;
};
