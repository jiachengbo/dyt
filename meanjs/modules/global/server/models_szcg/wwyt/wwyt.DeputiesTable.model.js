'use strict';

module.exports = function (sequelize, DataTypes) {

  var DeputiesTable = sequelize.define('DEPUTIESTABLE',
    {
      DeputiesId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      DeputiesName: {
        type: DataTypes.STRING(50),
        isimg: true,
        comment: ''
      },
      DeputiesSex: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      DeputiesBirth: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DeputiesAge: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesPlace: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      DeputiesParty: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesCulture: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesWork: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesPost: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      DeputiesTel: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesCode: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      CircleNum: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      DeputiesElect: {
        type: DataTypes.STRING(100),
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
  return DeputiesTable;
};
