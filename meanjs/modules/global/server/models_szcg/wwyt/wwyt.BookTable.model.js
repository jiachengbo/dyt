'use strict';

module.exports = function (sequelize, DataTypes) {

  var BookTable = sequelize.define('BOOKTABLE',
    {
      BookId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      BookName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      address: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Head: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      telNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      business: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      operateType: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Blong: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Image: {
        type: DataTypes.STRING(100),
        isimg: true,
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
  return BookTable;
};
