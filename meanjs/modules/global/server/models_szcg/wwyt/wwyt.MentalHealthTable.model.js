'use strict';

module.exports = function (sequelize, DataTypes) {

  var MentalHealthTable = sequelize.define('MENTALHEALTHTABLE',
    {
      MentalHealthId: {
        type: DataTypes.STRING(100),
        autoIncrement: false,
        primaryKey: true,
        allowNull: false
      },
      HealthContent: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      LectureMan: {
        type: DataTypes.STRING(20),
        comment: ''
      },
      TrainingPlace: {
        type: DataTypes.STRING(50),
        comment: ''
      },
      StartTime: {
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
  return MentalHealthTable;
};
