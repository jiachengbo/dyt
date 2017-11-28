'use strict';

module.exports = function (sequelize, DataTypes) {

  var MapPersonTypeTable = sequelize.define('MapPersonTypeTable',
    {
      persontypeid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      persontypename: {
        type: DataTypes.STRING(50),
        defaultValue: '',
        comment: 'persontypename'
      },
      persontypelogo: {
        type: DataTypes.STRING(200),
        defaultValue: '',
        comment: 'persontypelogo'
      },
      remarks: {
        type: DataTypes.STRING(1000),
        defaultValue: 0,
        comment: 'remarks'
      }
    },
    {
      comment: 'MapPersonTypeTable',
      classMethods: {
        associate: function (models) {
          this.hasMany(models.MapPersonTable,
            {foreignKey: 'persontype', targetKey: 'persontypeid'});
        }
      }
    }
  );

  return MapPersonTypeTable;
};
