'use strict';

module.exports = function (sequelize, DataTypes) {

  var streetIssue_WW = sequelize.define('STREETISSUE_WW',
    {
      streetIssue_WW_id: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      communityId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      gridId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      roadId: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      XF_stressPeople: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      XF_stressPerson: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SW_stressPeople: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      SW_stressPerson: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      resume: {
        type: DataTypes.STRING(2000),
        comment: ''
      },
      state: {
        type: DataTypes.STRING(500),
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
      issue_PT_type: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      type1ID: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      type2ID: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      type3ID: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      SB_time: {
        type: DataTypes.DATE,
        comment: ''
      },
      XF_time: {
        type: DataTypes.DATE,
        comment: ''
      },
      streetID: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      pic: {
        type: DataTypes.STRING(200),
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
        type: DataTypes.DATE,
        comment: ''
      },
      modifyUserId: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      modifyDate: {
        type: DataTypes.DATE,
        comment: ''
      },
      result: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      lat: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      lng: {
        type: DataTypes.STRING(200),
        comment: ''
      },
      GPS_location: {
        type: DataTypes.STRING(100),
        comment: ''
      },
      PT_typeID: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      SW_stressPersonID: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      receiveUser: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      receiveDepartment: {
        type: DataTypes.STRING(50),
        isimg: true,
        comment: ''
      },
      result_pic: {
        type: DataTypes.STRING(200),
        isimg: true,
        comment: ''
      },
      result_time: {
        type: DataTypes.DATE,
        comment: ''
      },
      actuality: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      is_syn: {
        type: DataTypes.INTEGER,
        comment: ''
      },
      q_ps: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      jb_ps: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      sq_ps: {
        type: DataTypes.STRING(500),
        comment: ''
      },
      video: {
        type: DataTypes.STRING(50),
        isimg: true,
        comment: ''
      },
      video1: {
        type: DataTypes.STRING(50),
        isimg: true,
        comment: ''
      }
    }
  );
  return streetIssue_WW;
};
