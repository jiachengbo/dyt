'use strict';

module.exports = function (sequelize, DataTypes) {

  var VacantPremisesTable = sequelize.define('VACANTPREMISESTABLE',
    {
      vacantId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      projectName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectContent: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      projectType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectHead: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectPhoto: {
        type: DataTypes.STRING(100),
        isimg: true,
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
      createUser: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      modifyUser: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.STRING(500),
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

  return VacantPremisesTable;
};
