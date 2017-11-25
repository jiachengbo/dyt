'use strict';

module.exports = function (sequelize, DataTypes) {

  var FloatingWomenTable = sequelize.define('FLOATINGWOMENTABLE',
    {
      FloatingWomenId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      FloatingWomenName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Birth: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Place: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      IDNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Father: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Mother: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Education: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      MarryStatus: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      StartDate: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      LeaveDate: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      Contraceptive: {
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
      BelongGrid: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongId: {
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
  return FloatingWomenTable;
};
