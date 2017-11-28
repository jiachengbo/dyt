'use strict';

module.exports = function (sequelize, DataTypes) {

  var BearTable = sequelize.define('BEARTABLE',
    {
      TrainId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      TrainTime: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      TrainAddress: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      TrainContent: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      TrainDanWei: {
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
  return BearTable;
};
