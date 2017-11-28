'use strict';

module.exports = function (sequelize, DataTypes) {

  var ChildShcoolTable = sequelize.define('CHILDSHCOOLTABLE',
    {
      SchoolId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      Properties: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      SchoolName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Head: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      KindergartenLeader: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      telNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      area: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      teacherNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ChildNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Blong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      remark: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Image: {
        type: DataTypes.STRING(100),
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
  return ChildShcoolTable;
};
