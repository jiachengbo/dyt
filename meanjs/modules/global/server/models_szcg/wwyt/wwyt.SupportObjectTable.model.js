'use strict';

module.exports = function (sequelize, DataTypes) {

  var SupportObjectTable = sequelize.define('SUPPORTOBJECTTABLE',
    {
      SupportId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      SupportName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      SupportSex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      cardNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      telNumber: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      familyPople: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      familyaddress: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SupportType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      condition: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      mainGrade: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Blong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      remark: {
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
      BlongGrid: {
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
  return SupportObjectTable;
};
