'use strict';

module.exports = function (sequelize, DataTypes) {

  var appeal = sequelize.define('APPEAL',
    {
      appealId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      appealTitle: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      appealContext: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      imagePath: {
        type: DataTypes.STRING(200),
        isimg: true,
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
        type: DataTypes.DATE,
        comment: ''
      },
      modifyUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.DATE,
        comment: ''
      },
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      gridId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      state: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      photoOne: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      photoTwo: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      photoThree: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      current_PT_type: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      SB_time: {
        type: DataTypes.DATE,
        comment: ''
      },
      HF_time: {
        type: DataTypes.DATE,
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      HF_text: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      JB_HF_text: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      is_syn: {
        type: DataTypes.INTEGER,
        comment: ''
      }
    }
  );

  return appeal;
};
