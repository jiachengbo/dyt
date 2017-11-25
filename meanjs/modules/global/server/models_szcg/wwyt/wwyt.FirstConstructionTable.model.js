'use strict';

module.exports = function (sequelize, DataTypes) {

  var FirstConstructionTable = sequelize.define('FIRSTCONSTRUCTIONTABLE',
    {
      projectId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      projectName: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      department: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      projectContent: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      projectType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectTotal: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      source: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      eddInvestment: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      constructionYear: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      constructionPlan: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      constructionWork: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      constructionHead: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      isassessment: {
        type: DataTypes.STRING(500),
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

  return FirstConstructionTable;
};
