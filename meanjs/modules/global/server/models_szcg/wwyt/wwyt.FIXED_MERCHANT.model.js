'use strict';

module.exports = function (sequelize, DataTypes) {

  var FIXED_MERCHANT = sequelize.define('FIXED_MERCHANT',
    {
      fixedMerchantId: {
        type: DataTypes.STRING(500),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      fixedMerchantPhoto: {
        type: DataTypes.STRING(1000),
        isimg: true,
        comment: ''
      },
      roadId: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      legalPersonName: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      telNum: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      businessLicenseNum: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      plaqueSize: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      parkCount: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      businessLicenseName: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      fixedMerchantName: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      business: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      information: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      context: {
        type: DataTypes.STRING(2000),
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
      businessLicencePhoto: {
        type: DataTypes.STRING(1000),
        isimg: true,
        comment: ''
      },
      mtPhoto: {
        type: DataTypes.STRING(1000),
        isimg: true,
        comment: ''
      },
      flag: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      password: {
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
  return FIXED_MERCHANT;
};
