'use strict';

module.exports = function (sequelize, DataTypes) {

  var LAWDETAIL = sequelize.define('LAWDETAIL',
    {
      flowMerchantId: {
        type: DataTypes.STRING(50),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      flowMerchantPhoto: {
        type: DataTypes.STRING(100),
        isimg: true,
        comment: ''
      },
      roadId: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      flowMerchantName: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      sex: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      identityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      telNum: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      context: {
        type: DataTypes.STRING(200),
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
      managerScope: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      managerNumber: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      bmArea: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      bmRoad: {
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
  return LAWDETAIL;
};
