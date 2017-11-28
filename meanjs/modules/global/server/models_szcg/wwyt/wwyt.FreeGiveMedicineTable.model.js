'use strict';

module.exports = function (sequelize, DataTypes) {

  var FreeGiveMedicineTable = sequelize.define('FREEGIVEMEDICINETABLE',
    {
      PersonId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      PersonName: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      Sex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DeformityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Guardian: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(100),
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
  return FreeGiveMedicineTable;
};
