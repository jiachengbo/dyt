'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  multer = require(path.resolve('./config/private/multer')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger'))
    .getLogger_FileNameBase(__filename);

//创建接收头像对象
var uploadImage = new multer('streetpersonfileimg',
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();

/**
 * Create an streetMemberTable
 */
exports.create = function (req, res) {
  var StreetMemberTable = sequelize.model('StreetMemberTable');
  var streetMemberTable = StreetMemberTable.build(req.body);
  var newingImageUrl;
  if (streetMemberTable) {
    uploadImage.recv(req, res, [{name: 'photo'}])
      .then(updateUserInfo)
      .then(function () {
        res.json(streetMemberTable);
      })
      .catch(function (err) {
        logger.error('上传照片失败:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'streetMemberTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (streetMemberTable) {
        if (files && files.photo && files.photo.length === 1) {
          streetMemberTable.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = streetMemberTable.photo;
        }
        streetMemberTable.name = req.body.name;
        streetMemberTable.sex = req.body.sex;
        streetMemberTable.duty = req.body.duty;
        streetMemberTable.work_unit = req.body.work_unit;
        streetMemberTable.type_style = req.body.type_style;
        // streetMemberTable.photo = req.body.photo;
        streetMemberTable.remark = req.body.remark;
        //图片
        streetMemberTable.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no grid person img upload'));
      }
    });
  }
};

/**
 * Show the current streetMemberTable
 */
exports.read = function (req, res) {
  var streetMemberTable = req.model ? req.model.toJSON() : {};
  streetMemberTable.isCurrentUserOwner = !!(req.user && streetMemberTable.user && streetMemberTable.user.id.toString() === req.user.id.toString());

  res.json(streetMemberTable);
};

/**
 * Update an streetMemberTable
 */
exports.update = function (req, res) {
  var streetMemberTable = req.model;
  var existingImageUrl;
  var newingImageUrl;
  if (streetMemberTable) {
    existingImageUrl = streetMemberTable.photo;
    uploadImage.recv(req, res, [{name: 'photo'}])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(streetMemberTable);
      })
      .catch(function (err) {
        logger.error('recv upload streetMemberTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'streetMemberTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (streetMemberTable) {
        if (files && files.photo && files.photo.length === 1) {
          streetMemberTable.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = streetMemberTable.photo;
        }
        streetMemberTable.name = req.body.name;
        streetMemberTable.sex = req.body.sex;
        streetMemberTable.duty = req.body.duty;
        streetMemberTable.work_unit = req.body.work_unit;
        streetMemberTable.type_style = req.body.type_style;
        // streetMemberTable.photo = req.body.photo;
        streetMemberTable.remark = req.body.remark;
        //图片
        streetMemberTable.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no grid person img upload'));
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
 * Delete an streetMemberTable
 */
exports.delete = function (req, res) {
  var streetMemberTable = req.model;

  streetMemberTable.destroy().then(function () {
    res.json(streetMemberTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of StreetMemberTable
 */
exports.list = function (req, res) {
  var StreetMemberTable = sequelize.model('StreetMemberTable');

  StreetMemberTable.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (streetMemberTable) {
    return res.jsonp(streetMemberTable);
  }).catch(function (err) {
    logger.error('streetMemberTable list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset) {
  var StreetMemberTable = sequelize.model('StreetMemberTable');
  StreetMemberTable.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (streetMemberTable) {
    return res.jsonp(streetMemberTable);
  }).catch(function (err) {
    logger.error('streetMemberTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from streetmembertable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    // logger.error('listCount error:', infos);
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * StreetMemberTable middleware
 */
exports.streetMemberTableByID = function (req, res, next, id) {
  var StreetMemberTable = sequelize.model('StreetMemberTable');
  var limit = parseInt(req.query.limit, 0);//0 10 20
  var offset = parseInt(req.query.offset, 0);//10 20 30
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    StreetMemberTable.findOne({
      where: {id: id}
    }).then(function (streetMemberTable) {
      if (!streetMemberTable) {
        logger.error('No streetMemberTable with that identifier has been found');
        return res.status(404).send({
          message: 'No streetMemberTable with that identifier has been found'
        });
      }

      req.model = streetMemberTable;
      next();
    }).catch(function (err) {
      logger.error('streetMemberTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
