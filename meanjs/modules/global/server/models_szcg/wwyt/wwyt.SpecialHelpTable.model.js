'use strict';

module.exports = function (sequelize, DataTypes) {

  var SpecialHelpTable = sequelize.define('SPECIALHELPTABLE',
    {
      HelpId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      HelpName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Sex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      Birth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IDNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MarryStatus: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MarryChange: {
        type: DataTypes.STRING(500),
        comment: ''
      },

      Category: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ApplyDate: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      UpTime: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Result: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      IsFirst: {
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
  return SpecialHelpTable;
};
