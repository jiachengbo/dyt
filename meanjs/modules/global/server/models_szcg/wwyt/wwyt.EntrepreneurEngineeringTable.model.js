'use strict';

module.exports = function (sequelize, DataTypes) {

  var EntrepreneurEngineeringTable = sequelize.define('ENTREPRENEURENGINEERINGTABLE',
    {
      EntrepreneurId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      SpouseName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Types: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DeclarationItem: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      HelpMoney: {
        type: DataTypes.STRING(200),
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
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      }
    }
  );
  return EntrepreneurEngineeringTable;
};
