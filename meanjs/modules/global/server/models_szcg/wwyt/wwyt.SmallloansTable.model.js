'use strict';

module.exports = function (sequelize, DataTypes) {

  var SmallloansTable = sequelize.define('SMALLLOANSTABLE',
    {
      smallId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      smallName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallNo: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      smallBelong: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallSex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallAge: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallAddress: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      smallManagement: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      smallManagementAddress: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      smallTel: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallTime: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallJE: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      smallRemark: {
        type: DataTypes.STRING(1000),
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
  return SmallloansTable;
};
