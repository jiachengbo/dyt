'use strict';

var path = require('path'),
  dbExtend = require(path.resolve('./config/lib/dbextend'));

module.exports = function (sequelize, DataTypes) {

  var CommunityVillageConstant = sequelize.define('CommunityVillageConstant',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        comment: '序号'
      },
      name: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '社区村名称'
      },
      roles: {
        type: DataTypes.STRING(100),
        defaultValue: '',
        comment: '权限名称'
      }
    },
    {
      comment: '社区村常量表',
      classMethods: {
        associate: function (models) {
          this.hasMany(models.InteractionTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.DynamicTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.MapPersonTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.KeyWorkTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.PioneerExemplaryTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.PartyBuildInstructorTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.ThreeServiceTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.PovertyAlleviationTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.PartyOrganizationReorganizationTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.LearningDynamicsTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.EnterCommunityTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.FederationsTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.JULACTable,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.PartyMemberTable,
            {foreignKey: 'community', targetKey: 'id'});
          this.hasMany(models.AreaDepartmentManagement,
            {foreignKey: 'communityid', targetKey: 'id'});
          this.hasMany(models.ThreeMasterMemberManagement,
            {foreignKey: 'community', targetKey: 'id'});
          this.hasMany(models.Littlewish,
            {foreignKey: 'community', targetKey: 'id'});
        }
      }
    }
  );
  dbExtend.addBaseCode('CommunityVillageConstant', {attributes: ['id', 'name']});
  return CommunityVillageConstant;
};
