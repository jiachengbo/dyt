'use strict';

module.exports = function (sequelize, DataTypes) {
  // 党建指导员 新版
  var PartyBuildInstructorMember = sequelize.define('PartyBuildInstructorMember',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '姓名'
      },
      sex: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '性别'
      },
      tel: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '联系电话'
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '地址'
      },
      party: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'user_id'
      },
      photo: {
        type: DataTypes.STRING,
        comment: '照片'
      }
    },
    {
      comment: '党建指导员表',
      tableName: 'PartyBuildInstructorMember'
    }
  );

  return PartyBuildInstructorMember;
};
