'use strict';

module.exports = function (sequelize, DataTypes) {

  var ReleasePersonTable = sequelize.define('RELEASEPERSONTABLE',
    {
      PersonId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      PersonName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Sex: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      OnceName: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      Nation: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      IdentityCard: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Birth: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      TelNumber: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      Culture: {
        type: DataTypes.STRING(100),
        comment: ''
      },

      Address: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      HouseRegister: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      HelpCondition: {
        type: DataTypes.STRING(400),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(200),
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
  return ReleasePersonTable;
};
