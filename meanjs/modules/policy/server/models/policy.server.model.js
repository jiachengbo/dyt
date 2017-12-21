'use strict';

module.exports = function (sequelize, DataTypes) {

  var Policy = sequelize.define('Policy',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '标体'
      },
      content: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '内容'
      },
      type: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '类型'
      },
      creatime: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        comment: '创建时间'
      },
      file_path: {
        type: DataTypes.STRING,
        defaultValue: '',
        comment: '文件上传'
      }
    },
    {
      comment: '政策法规'
      /*indexes: [
       {
       //在外键上建立索引
       fields: ['user_id']
       }
       ],
       classMethods: {
       associate: function (models) {
       this.belongsTo(models.User,
       {foreignKey: 'user_id'});
       }
       }*/
    }
  );

  return Policy;
};
