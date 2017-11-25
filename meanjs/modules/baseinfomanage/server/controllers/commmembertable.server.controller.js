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
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

//创建接收头像对象
var uploadImage = new multer('communitypersonfileimg',
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();

/**
 * Create an commMemberTable
 */
exports.create = function (req, res) {
  var CommMemberTable = sequelize.model('CommMemberTable');
  var commMemberTable = CommMemberTable.build(req.body);
  var newingImageUrl;
  if (commMemberTable) {
    uploadImage.recv(req, res, [{name: 'photo'}])
      .then(updateUserInfo)
      .then(function () {
        res.json(commMemberTable);
      })
      .catch(function (err) {
        logger.error('上传照片失败:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'commMemberTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (commMemberTable) {
        if (files && files.photo && files.photo.length === 1) {
          commMemberTable.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = commMemberTable.photo;
        }
        commMemberTable.name = req.body.name;
        commMemberTable.sex = req.body.sex;
        commMemberTable.duty = req.body.duty;
        commMemberTable.work_unit = req.body.work_unit;
        commMemberTable.type_style = req.body.type_style;
        // commMemberTable.photo = req.body.photo;
        commMemberTable.remark = req.body.remark;
        //图片
        commMemberTable.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no img upload'));
      }
    });
  }
};

/**
 * Show the current commMemberTable
 */
exports.read = function (req, res) {
  var commMemberTable = req.model ? req.model.toJSON() : {};
  commMemberTable.isCurrentUserOwner = !!(req.user && commMemberTable.user && commMemberTable.user.id.toString() === req.user.id.toString());

  res.json(commMemberTable);
};

/**
 * Update an commMemberTable
 */
exports.update = function (req, res) {
  var commMemberTable = req.model;
  var existingImageUrl;
  var newingImageUrl;
  if (commMemberTable) {
    existingImageUrl = commMemberTable.photo;
    uploadImage.recv(req, res, [{name: 'photo'}])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(commMemberTable);
      })
      .catch(function (err) {
        logger.error('recv upload commMemberTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'commMemberTable is not exist'
    });
  }
  //---------上传新照片------
  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (commMemberTable) {
        if (files && files.photo && files.photo.length === 1) {
          commMemberTable.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = commMemberTable.photo;
        }
        commMemberTable.name = req.body.name;
        commMemberTable.sex = req.body.sex;
        commMemberTable.duty = req.body.duty;
        commMemberTable.work_unit = req.body.work_unit;
        commMemberTable.type_style = req.body.type_style;
        // streetMemberTable.photo = req.body.photo;
        commMemberTable.remark = req.body.remark;
        //图片
        commMemberTable.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no img upload'));
      }
    });
  }

  //----------删除旧照片----------
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
 * Delete an commMemberTable
 */
exports.delete = function (req, res) {
  var commMemberTable = req.model;

  commMemberTable.destroy().then(function () {
    res.json(commMemberTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of CommMemberTable
 */
exports.list = function (req, res) {
  var CommMemberTable = sequelize.model('CommMemberTable');
  CommMemberTable.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (commMemberTable) {
    return res.jsonp(commMemberTable);
  }).catch(function (err) {
    logger.error('commMemberTable list error:', err);
    return res.status(422).send(err);
  });
};

//----分页
function listByPage(req, res, limit, offset) {
  var CommMemberTable = sequelize.model('CommMemberTable');
  CommMemberTable.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (commMemberTable) {
    return res.jsonp(commMemberTable);
  }).catch(function (err) {
    logger.error('CommMemberTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from CommMemberTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}

/**
 * CommMemberTable middleware
 */
exports.commMemberTableByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var CommMemberTable = sequelize.model('CommMemberTable');
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    CommMemberTable.findOne({
      where: {id: id}
    }).then(function (commMemberTable) {
      if (!commMemberTable) {
        logger.error('No commMemberTable with that identifier has been found');
        return res.status(404).send({
          message: 'No commMemberTable with that identifier has been found'
        });
      }
      req.model = commMemberTable;
      next();
    }).catch(function (err) {
      logger.error('commMemberTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
