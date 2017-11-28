'use strict';

module.exports = function (sequelize, DataTypes) {

  var TwoChildTable = sequelize.define('TWOCHILDTABLE',
    {
      TwoId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      MoName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      MOAge: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      YuChanTime: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IsChildHealth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ChildSex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IsSuccess: {
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
  return TwoChildTable;
};
