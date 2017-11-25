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
var uploadImage = new multer('zhidaoyuanimg',
  2 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();

/**
 * Create an partyBuildInstructorTable
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorMember');
  var pbiMember = PartyBuildInstructorTable.build(req.body);

  if (pbiMember) {
    uploadImage.recv(req, res, [{name: 'photo'}])
      .then(updateUserInfo)
      .then(function () {
        res.json(pbiMember);
      })
      .catch(function (err) {
        logger.error('上传照片失败:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'pbiMember is not exist'
    });
  }
  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (pbiMember) {
        if (files && files.photo && files.photo.length === 1) {
          pbiMember.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
        }
        pbiMember.party = req.body.party; // user_id
        pbiMember.name = req.body.name;
        pbiMember.sex = req.body.sex;
        pbiMember.tel = req.body.tel;
        pbiMember.address = req.body.address;
        //图片
        pbiMember.save().then(function () {
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
 * Show the current partyBuildInstructorTable
 */
exports.read = function (req, res) {
  var partyBuildInstructorTable = req.model ? req.model.toJSON() : {};
  partyBuildInstructorTable.isCurrentUserOwner = !!(req.user && partyBuildInstructorTable.user && partyBuildInstructorTable.user.id.toString() === req.user.id.toString());

  res.json(partyBuildInstructorTable);
};

/**
 * Update an partyBuildInstructorTable
 */
exports.update = function (req, res) {
  var pbiMember = req.model;
  var existingImageUrl;
  var newingImageUrl;
  if (pbiMember) {
    existingImageUrl = pbiMember.photo;
    uploadImage.recv(req, res, [{name: 'photo'}])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(pbiMember);
      })
      .catch(function (err) {
        logger.error('recv upload pbiMember picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'pbiMember is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (pbiMember) {
        if (files && files.photo && files.photo.length === 1) {
          pbiMember.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = pbiMember.photo;
        }
        pbiMember.name = req.body.name;
        pbiMember.sex = req.body.sex;
        pbiMember.tel = req.body.tel;
        pbiMember.address = req.body.address;
        //图片
        pbiMember.save().then(function () {
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
 * Delete an partyBuildInstructorTable
 */
exports.delete = function (req, res) {
  var partyBuildInstructorTable = req.model;
  partyBuildInstructorTable.destroy().then(function () {
    res.json(partyBuildInstructorTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of PartyBuildInstructorTable
 */
exports.list = function (req, res) {
  /*
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorMember');
  PartyBuildInstructorTable.findAll({
    limit: [0, 20],
    order: 'id desc'
  }).then(function (partyBuildInstructorTable) {
    return res.jsonp(partyBuildInstructorTable);
  }).catch(function (err) {
    logger.error('PartyBuildInstructorMember list error:', err);
    return res.status(422).send(err);
  });*/
};
//----分页
function listByPage(req, res, limit, offset, party) {
  var PartyBuildInstructorMember = sequelize.model('PartyBuildInstructorMember');
  var where;
  where = {
    party: party
  };
  PartyBuildInstructorMember.findAll({
    where: where,
    limit: [limit, offset],
    order: 'id DESC'
  }).then(function (partyBuildInstructorMember) {
    return res.jsonp(partyBuildInstructorMember);
  }).catch(function (err) {
    logger.error('PartyBuildInstructorMember list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, party) {
  var sql;
  sql = 'select count(*) sum from PartyBuildInstructorMember where party = ' + party;
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 *
 */
exports.partyBuildInstructorMemberByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var party = req.query.party;
  var PartyBuildInstructorMember = sequelize.model('PartyBuildInstructorMember');
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset, party);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res, party);
  } else if (id !== '0') {
    PartyBuildInstructorMember.findOne({
      where: {id: id}
    }).then(function (partyBuildInstructorMember) {
      if (!partyBuildInstructorMember) {
        logger.error('No partyBuildInstructorTable with that identifier has been found');
        return res.status(404).send({
          message: 'No partyBuildInstructorTable with that identifier has been found'
        });
      }
      req.model = partyBuildInstructorMember;
      next();
    }).catch(function (err) {
      logger.error('partyBuildInstructorMember ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
