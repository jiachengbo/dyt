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
var uploadImage = new multer('PioneerExemplaryPicfileimg',
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();
/**
 * Create an PioneerExemplaryTable
 */
exports.create = function (req, res) {
  var pioneerExemplaryTable = sequelize.model('PioneerExemplaryTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var PioneerExemplaryTable = pioneerExemplaryTable.build(req.body);
  var newingImageUrl;
  if (PioneerExemplaryTable) {
    uploadImage.recv(req, res, [
      {name: 'photos'}
    ])
      .then(updateUserInfo)
      .then(function () {
        res.json(PioneerExemplaryTable);
      })
      .catch(function (err) {
        logger.error('上传照片失败:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'PioneerExemplaryTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (PioneerExemplaryTable) {
        if (files && files.photos && files.photos.length === 1) {
          PioneerExemplaryTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = PioneerExemplaryTable.photos;
        }
        PioneerExemplaryTable.name = req.body.name;
        PioneerExemplaryTable.sex = req.body.sex;
        PioneerExemplaryTable.communityid = req.body.communityid;
        PioneerExemplaryTable.deeds = req.body.deeds;
        PioneerExemplaryTable.time = req.body.time;
        PioneerExemplaryTable.type = req.body.type;
        PioneerExemplaryTable.createdate = new Date();
        //图片
        PioneerExemplaryTable.save().then(function () {
          //重新加载数据，使数据含有关联表的内容
          return PioneerExemplaryTable.reload({
            include: [
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
        reject(new Error('no StreetDynamicsTable img upload'));
      }
    });
  }
};

/**
 * Show the current PioneerExemplaryTable
 */
exports.read = function (req, res) {
  var PioneerExemplaryTable = req.model ? req.model.toJSON() : {};

  //PioneerExemplaryTable.isCurrentUserOwner = !!(req.user && PioneerExemplaryTable.user && PioneerExemplaryTable.user._id.toString() === req.user._id.toString());
  PioneerExemplaryTable.isCurrentUserOwner = !!(req.user && PioneerExemplaryTable.user && PioneerExemplaryTable.user.id.toString() === req.user.id.toString());

  res.json(PioneerExemplaryTable);
};

/**
 * Update an PioneerExemplaryTable
 */
exports.update = function (req, res) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var PioneerExemplaryTable = req.model;
  var existingImageUrl;
  var newingImageUrl;
  if (PioneerExemplaryTable) {
    existingImageUrl = PioneerExemplaryTable.photos;
    uploadImage.recv(req, res, [
      {name: 'photos'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(PioneerExemplaryTable);
      })
      .catch(function (err) {
        logger.error('recv upload PioneerExemplaryTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'PioneerExemplaryTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (PioneerExemplaryTable) {
        if (files && files.photos && files.photos.length === 1) {
          PioneerExemplaryTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = PioneerExemplaryTable.photos;
        }
        PioneerExemplaryTable.name = req.body.name;
        PioneerExemplaryTable.sex = req.body.sex;
        PioneerExemplaryTable.communityid = req.body.communityid;
        PioneerExemplaryTable.deeds = req.body.deeds;
        PioneerExemplaryTable.time = req.body.time;
        PioneerExemplaryTable.type = req.body.type;
        //图片
        PioneerExemplaryTable.save().then(function () {
          return PioneerExemplaryTable.reload({
            include: [
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
        reject(new Error('no StreetDynamicsTable img upload'));
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
 * Delete an PioneerExemplaryTable
 */
exports.delete = function (req, res) {
  var PioneerExemplaryTable = req.model;

  PioneerExemplaryTable.destroy().then(function () {
    res.json(PioneerExemplaryTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of PioneerExemplaryTable
 */
exports.list = function (req, res) {
  var PioneerExemplaryTable = sequelize.model('PioneerExemplaryTable');

  PioneerExemplaryTable.findAll({
    order: 'createdate DESC'
  }).then(function (PioneerExemplaryTable) {
    return res.jsonp(PioneerExemplaryTable);
  }).catch(function (err) {
    logger.error('PioneerExemplaryTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * PioneerExemplaryTable middleware
 */
exports.pioneerexemplaryinfoByID = function (req, res, next, id) {
  var PioneerExemplaryTable = sequelize.model('PioneerExemplaryTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
    } else {
      listByPage(req, res, limit, offset);
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      listCount_comm(req, res, parseInt(commId, 0));
    } else {
      listCount(req, res);
    }
  } else if (id !== '0') {
    PioneerExemplaryTable.findOne({
      where: {id: id}
    }).then(function (PioneerExemplaryTable) {
      if (!PioneerExemplaryTable) {
        logger.error('No PioneerExemplaryTable with that identifier has been found');
        return res.status(404).send({
          message: 'No PioneerExemplaryTable with that identifier has been found'
        });
      }

      req.model = PioneerExemplaryTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('PioneerExemplaryTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var PioneerExemplaryTable = sequelize.model('PioneerExemplaryTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  PioneerExemplaryTable.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('PioneerExemplaryTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from PioneerExemplaryTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId) {
  var PioneerExemplaryTable = sequelize.model('PioneerExemplaryTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  PioneerExemplaryTable.findAll({
    where: {communityid: commId},
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('PioneerExemplaryTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId) {
  var sql = 'select count(*) sum from PioneerExemplaryTable where communityid = ' + commId + '';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
