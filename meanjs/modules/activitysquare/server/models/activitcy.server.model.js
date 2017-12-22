'use strict';

module.exports = function (sequelize, DataTypes) {

  var Activitcy = sequelize.define('Activitcy',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userid: {
        type: DataTypes.INTEGER,
        comment: '党员id'
      },
      activitID: {
        type: DataTypes.INTEGER,
        comment: '活动id'
      }
    },
    {
      comment: '活动广场参与人员表'
    }
  );

  return Activitcy;
};
