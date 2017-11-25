'use strict';

module.exports = function (sequelize, DataTypes) {

  var ContradicDisputeTable = sequelize.define('CONTRADICDISPUTETABLE',
    {
      ContradicId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      ContradicName: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      ContradicType: {
        type: DataTypes.STRING(1000),
        comment: ''
      },
      Belong: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      BelongGrid: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      IsNewContradic: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      involveNum: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      StreetLeadership: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      QuLeadership: {
        type: DataTypes.STRING(500),
        comment: ''
      },

      AttentionRank: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      BasicCondition: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      HandleProgress: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      HandleIdea: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      Remark: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      isdelete: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      createUserId: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      createDate: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      modifyUserId: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      modifyDate: {
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

  return ContradicDisputeTable;
};
