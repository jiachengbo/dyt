'use strict';

module.exports = function (sequelize, DataTypes) {

  var DeformitySubsidyTable = sequelize.define('DEFORMITYSUBSIDYTABLE',
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
      DeformityCategory: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CardId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(100),
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
  return DeformitySubsidyTable;
};
