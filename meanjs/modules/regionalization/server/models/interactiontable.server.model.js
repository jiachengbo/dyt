'use strict';

module.exports = function (sequelize, DataTypes) {
  //互动交流表
  var InteractionTable = sequelize.define('InteractionTable',
    {
      interactionid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      problem: {
        type: DataTypes.STRING(5000),
        defaultValue: '',
        comment: 'problem'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'communityid'
      },
      party: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '党建类型'
      },
      hf_userid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'hf_userid'
      },
      hf_time: {
        type: DataTypes.DATE,
        comment: 'hf_time'
      },
      hf_text: {
        type: DataTypes.STRING(800),
        defaultValue: '',
        comment: 'hf_text'
      },
      remarks: {
        type: DataTypes.STRING(1000),
        defaultValue: '',
        comment: 'remarks'
      },
      isdelete: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'isdelete'
      },
      createuserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'createuserid'
      },
      createdate: {
        type: DataTypes.DATE,
        comment: 'createdate'
      },
      modifyUserid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'modifyUserid'
      },
      modifydate: {
        type: DataTypes.DATE,
        comment: 'modifydate'
      }
    },
    {
      comment: 'InteractionTable',
      indexes: [
        {
          fields: ['communityid']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'communityid'});
        }
      }
    }
  );

  return InteractionTable;
};
