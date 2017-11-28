'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  multer = require(path.resolve('./config/private/multer')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);
//创建项目进展对象
var uploadImage = new multer('MapPersonPicfileimg',
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();
/**
 * Create an map
 */
exports.create = function (req, res) {
  var mapPersonTable = sequelize.model('MapPersonTable');
  var MapPersonTypeTable = sequelize.model('MapPersonTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var MapPersonTable = mapPersonTable.build(req.body);
  var newingImageUrl;
  if (MapPersonTable) {
    uploadImage.recv(req, res, [
      {name: 'photos'}
    ])
      .then(updateUserInfo)
      .then(function () {
        res.json(MapPersonTable);
      })
      .catch(function (err) {
        logger.error('上传照片失败:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'MapPersonTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (MapPersonTable) {
        if (files && files.photos && files.photos.length === 1) {
          MapPersonTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = MapPersonTable.photos;
        }
        MapPersonTable.name = req.body.name;
        MapPersonTable.sex = req.body.sex;
        // MapPersonTable.birth = req.body.birth;
        MapPersonTable.identityid = req.body.identityid;
        MapPersonTable.tel = req.body.tel;
        MapPersonTable.familynum = req.body.familynum;
        MapPersonTable.familymember = req.body.familymember;
        MapPersonTable.familyaddress = req.body.familyaddress;
        MapPersonTable.persontype = req.body.persontype;
        MapPersonTable.difficultreason = req.body.difficultreason;
        MapPersonTable.difficultdemand = req.body.difficultdemand;
        MapPersonTable.communityid = req.body.communityid;
        MapPersonTable.partytype = req.body.partytype;
        MapPersonTable.lng = req.body.lng;
        MapPersonTable.lat = req.body.lat;
        MapPersonTable.createdate = new Date();
        //图片
        MapPersonTable.save().then(function () {
          //重新加载数据，使数据含有关联表的内容
          return MapPersonTable.reload({
            include: [
              {
                model: MapPersonTypeTable,
                attributes: ['persontypename']
              },
              {
                model: CommunityVillageConstant,
                attributes: ['name']
              }
            ]
          })
            .then(function () {
              resolve();
            });
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no MapPersonTable img upload'));
      }
    });
  }
};

/**
 * Show the current map
 */
exports.read = function (req, res) {
  var map = req.model ? req.model.toJSON() : {};
  //map.isCurrentUserOwner = !!(req.user && map.user && map.user._id.toString() === req.user._id.toString());
  map.isCurrentUserOwner = !!(req.user && map.user && map.user.id.toString() === req.user.id.toString());

  res.json(map);
};

/**
 * Update an map
 */
exports.update = function (req, res) {
  var MapPersonTypeTable = sequelize.model('MapPersonTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var MapPersonTable = req.model;
  var existingImageUrl;
  var newingImageUrl;
  if (MapPersonTable) {
    existingImageUrl = MapPersonTable.photos;
    uploadImage.recv(req, res, [
      {name: 'photos'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(MapPersonTable);
      })
      .catch(function (err) {
        logger.error('recv upload MapPersonTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'MapPersonTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (MapPersonTable) {
        if (files && files.photos && files.photos.length === 1) {
          MapPersonTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = MapPersonTable.photos;
        }
        MapPersonTable.name = req.body.name;
        MapPersonTable.sex = req.body.sex;
        // MapPersonTable.birth = req.body.birth;
        MapPersonTable.identityid = req.body.identityid;
        MapPersonTable.tel = req.body.tel;
        MapPersonTable.familynum = req.body.familynum;
        MapPersonTable.familymember = req.body.familymember;
        MapPersonTable.familyaddress = req.body.familyaddress;
        MapPersonTable.persontype = req.body.persontype;
        MapPersonTable.difficultreason = req.body.difficultreason;
        MapPersonTable.difficultdemand = req.body.difficultdemand;
        MapPersonTable.communityid = req.body.communityid;
        MapPersonTable.partytype = req.body.partytype;
        MapPersonTable.lng = req.body.lng;
        MapPersonTable.lat = req.body.lat;
        //图片
        MapPersonTable.save().then(function () {
          return MapPersonTable.reload({
            include: [
              {
                model: MapPersonTypeTable,
                attributes: ['persontypename']
              },
              {
                model: CommunityVillageConstant,
                attributes: ['name']
              }
            ]
          })
            .then(function () {
              resolve();
            });
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no MapPersonTable img upload'));
      }
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (existingImageUrl && newingImageUrl) {
        var oldfilename = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfilename, function (unlinkError) {
          if (unlinkError) {
            resolve();
            /* reject({
             message: 'Error while deleting old picture'
             });*/
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
};

/**
 * Delete an map
 */
exports.delete = function (req, res) {
  var map = req.model;

  map.destroy().then(function () {
    res.json(map);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Map
 */
exports.list = function (req, res) {
  var MapPersonTable = sequelize.model('MapPersonTable');
  var MapPersonTypeTable = sequelize.model('MapPersonTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');

  MapPersonTable.findAll({
    include: [
      {
        model: MapPersonTypeTable,
        attributes: ['persontypename']
      },
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [0, 20],
    order: 'createdate DESC'
  }).then(function (map) {
    return res.jsonp(map);
  }).catch(function (err) {
    logger.error('map list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Map middleware
 */
exports.mapPersonByID = function (req, res, next, id) {
  var MapPersonTable = sequelize.model('MapPersonTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  var partytype = req.query.partytype;
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      if (partytype) {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0), partytype);
      } else {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
      }
    } else {
      if (partytype) {
        listByPage(req, res, limit, offset, partytype);
      } else {
        listByPage(req, res, limit, offset);
      }
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      if (partytype) {
        listCount_comm(req, res, parseInt(commId, 0), partytype);
      } else {
        listCount_comm(req, res, parseInt(commId, 0));
      }
    } else {
      if (partytype) {
        listCount(req, res, partytype);
      } else {
        listCount(req, res);
      }
    }
  } else if (id !== '0') {
    MapPersonTable.findOne({
      where: {personid: id}
    }).then(function (mapPersonTable) {
      if (!mapPersonTable) {
        logger.error('No MapPersonTable with that identifier has been found');
        return res.status(404).send({
          message: 'No MapPersonTable with that identifier has been found'
        });
      }
      req.model = mapPersonTable;
      next();
    }).catch(function (err) {
      logger.error('MapPersonTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};

/**
 * List of personTypeList
 */
exports.personTypeList = function (req, res) {
  var MapPersonTypeTable = sequelize.model('MapPersonTypeTable');

  MapPersonTypeTable.findAll({
    order: 'persontypeid ASC'
  }).then(function (personTypeInfo) {
    return res.jsonp(personTypeInfo);
  }).catch(function (err) {
    logger.error('map personTypeList error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset, partytype) {
  var MapPersonTable = sequelize.model('MapPersonTable');
  var MapPersonTypeTable = sequelize.model('MapPersonTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var where;
  if (partytype) {
    where = {
      where: {partytype: partytype},
      include: [
        {
          model: MapPersonTypeTable,
          attributes: ['persontypename']
        },
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  } else {
    where = {
      include: [
        {
          model: MapPersonTypeTable,
          attributes: ['persontypename']
        },
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  }
  MapPersonTable.findAll(where).then(function (MapPersonTable) {
    return res.jsonp(MapPersonTable);
  }).catch(function (err) {
    logger.error('MapPersonTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, partytype) {
  var sql;
  if (partytype) {
    sql = 'select count(*) sum from MapPersonTable where partytype = ' + partytype;
  } else {
    sql = 'select count(*) sum from MapPersonTable';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId, partytype) {
  var MapPersonTable = sequelize.model('MapPersonTable');
  var MapPersonTypeTable = sequelize.model('MapPersonTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var where;
  if (partytype) {
    where = {
      communityid: commId,
      partytype: partytype
    };
  } else {
    where = {
      communityid: commId
    };
  }
  MapPersonTable.findAll({
    where: where,
    include: [
      {
        model: MapPersonTypeTable,
        attributes: ['persontypename']
      },
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (MapPersonTable) {
    return res.jsonp(MapPersonTable);
  }).catch(function (err) {
    logger.error('MapPersonTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId, partytype) {
  var sql;
  if (partytype) {
    sql = 'select count(*) sum from MapPersonTable where communityid = ' + commId + ' and partytype = ' + partytype;
  } else {
    sql = 'select count(*) sum from MapPersonTable where communityid = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
