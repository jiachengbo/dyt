'use strict';

module.exports = function (sequelize, DataTypes) {

  var AttractInvestmentTable = sequelize.define('ATTRACTINVESTMENTTABLE',
    {
      projectId: {
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
      projectCoop: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectHead: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      sourceType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectTotal: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      projectPhoto: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },

      ProYear: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      remark: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyUser: {
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

  return AttractInvestmentTable;
};
