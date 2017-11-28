'use strict';

module.exports = function (sequelize, DataTypes) {

  var UnemploymentpermitTable = sequelize.define('UNEMPLOYMENTPERMITTABLE',
    {
      permitId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      permitName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      permitNo: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      permitNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      permitType: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      permintTime: {
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
  return UnemploymentpermitTable;
};
