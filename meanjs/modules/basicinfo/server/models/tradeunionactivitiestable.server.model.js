'use strict';

module.exports = function (sequelize, DataTypes) {

  var TradeUnionActivitiesTable = sequelize.define('TradeUnionActivitiesTable',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '活动名称'
      },
      photos: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '照片'
      },
      file_path: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '照片'
      },
      type: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: '活动类型'
      },
      content: {
        type: DataTypes.STRING(10000),
        defaultValue: '',
        comment: '活动内容'
      },
      time: {
        type: DataTypes.DATE,
        comment: '活动时间'
      },
      remarks: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: '备注'
      },
      createuserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '创建人ID'
      },
      createdate: {
        type: DataTypes.DATE,
        comment: '创建时间'
      }
    },
    {
      comment: '工会活动表'
    }
  );

  return TradeUnionActivitiesTable;
};
