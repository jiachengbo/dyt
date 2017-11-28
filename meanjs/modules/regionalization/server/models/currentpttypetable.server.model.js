'use strict';

module.exports = function (sequelize, DataTypes) {
  //当前处理平台常量表
  var CurrentPtTypeTable = sequelize.define('CurrentPtTypeTable',
    {
      current_pt_typeid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      current_pt_typename: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'current_pt_typename'
      },
      remarks: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: 'remarks'
      }
    },
    {
      comment: 'CurrentPtTypeTable'
    }
  );
  return CurrentPtTypeTable;
};
