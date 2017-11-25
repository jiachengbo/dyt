'use strict';

module.exports = function (sequelize, DataTypes) {

  var UnemploymentpermitsforTable = sequelize.define('UNEMPLOYMENTPERMITSFORTABLE',
    {
      permitsId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      permitsName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      permitsSex: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      permitsNo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      permitsAddress: {
        type: DataTypes.STRING(100),
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
      mz: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      xl: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      byyx: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      gridId: {
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
  return UnemploymentpermitsforTable;
};
