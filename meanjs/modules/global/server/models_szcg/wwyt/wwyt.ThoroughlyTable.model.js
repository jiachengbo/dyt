'use strict';

module.exports = function (sequelize, DataTypes) {

  var ThoroughlyTable = sequelize.define('THOROUGHLYTABLE',
    {
      ThoroughlyId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      projectName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      SetProject: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Announcement: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      LandCertificate: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      LandPermit: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      FireControl: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      CivilDefense: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TheEIA: {
        type: DataTypes.STRING(50),
        comment: ''
      },

      ConstructionPermit: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      PreSale: {
        type: DataTypes.STRING(50),
        comment: ''
      },

      IsMoment: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      HandlingProcedures: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ExistProblem: {
        type: DataTypes.STRING(50),
        comment: ''
      },

      ThorougThlyears: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      ThNum: {
        type: DataTypes.INTEGER,
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

  return ThoroughlyTable;
};
