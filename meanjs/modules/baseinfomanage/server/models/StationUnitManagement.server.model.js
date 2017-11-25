'use strict';

module.exports = function (sequelize, DataTypes) {

  var StationUnitManagement = sequelize.define('StationUnitManagement',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '单位名称'
      },
      address: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '地址'
      },
      zip_code: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '邮编'
      },
      contact_information: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '联系方式'
      }
    },
    {
      comment: '驻地单位管理表'
    }
  );
  return StationUnitManagement;
};
