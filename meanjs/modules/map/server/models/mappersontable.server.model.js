'use strict';

module.exports = function (sequelize, DataTypes) {

  var MapPersonTable = sequelize.define('MapPersonTable',
    {
      personid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'name'
      },
      sex: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'sex'
      },
      birth: {
        type: DataTypes.DATE,
        comment: 'birth'
      },
      identityid: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'identityid'
      },
      tel: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'tel'
      },
      familynum: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'familynum'
      },
      familymember: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'familymember'
      },
      familyaddress: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: 'familyaddress'
      },
      communityid: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'communityid'
      },
      finishtime: {
        type: DataTypes.DATE,
        comment: 'finishtime'
      },
      persontype: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: 'persontype'
      },
      difficultreason: {
        type: DataTypes.STRING(800),
        defaultValue: '',
        comment: 'difficultreason'
      },
      difficultdemand: {
        type: DataTypes.STRING(800),
        defaultValue: '',
        comment: 'difficultdemand'
      },
      lng: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '经度'
      },
      lat: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '维度'
      },
      photos: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: '图片'
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
      },
      partytype: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        comment: '所属党建'
      }
    },
    {
      comment: 'MapPersonTable',
      indexes: [
        {
          fields: ['persontype']
        },
        {
          fields: ['communityid']
        }
      ],
      classMethods: {
        associate: function (models) {
          this.belongsTo(models.MapPersonTypeTable,
            {foreignKey: 'persontype'});
          this.belongsTo(models.CommunityVillageConstant,
            {foreignKey: 'communityid'});
        }
      }
    }
  );

  return MapPersonTable;
};
