'use strict';

module.exports = function (sequelize, DataTypes) {

  var FlowPeopleTable = sequelize.define('FLOWPEOPLETABLE',
    {
      PeopId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      PeopName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      sex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      CardId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DetailAddress: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Grid: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Ishire: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CheckTime: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Remark: {
        type: DataTypes.STRING(200),
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
      AccompanyName: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompany: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumber: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanyNametwo: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySextwo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompanytwo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumbertwo: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanyNamethree: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySexthree: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompanythree: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumberthree: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanyNamefour: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySexfour: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompanyfour: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumberfour: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanyNamefive: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySexfive: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompanyfive: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumberfive: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanyNamesix: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySexsix: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompanysix: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumbersix: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanyNameseven: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      AccompanySexseven: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Accompanyseven: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNumberseven: {
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
  return FlowPeopleTable;
};
