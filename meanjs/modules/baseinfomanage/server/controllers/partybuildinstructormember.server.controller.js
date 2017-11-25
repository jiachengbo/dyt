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
        pbiMember.party = req.body.party; // 党建类型1-5
        pbiMember.name = req.body.name;
        pbiMember.sex = req.body.sex;
        pbiMember.tel = req.body.tel;
        pbiMember.address = req.body.address;
        // 所管理的社区或者村 Id
        pbiMember.communityIds = req.body.communityIds;
        // 所管理社区 村 对应的 ui-li index,方便修改反显
        pbiMember.communityIndexs = req.body.communityIndexs;
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
        pbiMember.communityIds = req.body.communityIds;
        pbiMember.communityIndexs = req.body.communityIndexs;
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
  if (party) {
    where = {
      where: {
        party: party
      },
      limit: [limit, offset],
      order: 'id DESC'
    };
  } else {
    where = {
      limit: [limit, offset],
      order: 'id DESC'
    };
  }

  PartyBuildInstructorMember.findAll(where).then(function (partyBuildInstructorMember) {
    return res.jsonp(partyBuildInstructorMember);
  }).catch(function (err) {
    logger.error('PartyBuildInstructorMember list error:', err);
    return res.status(422).send(err);
  });
}
//---社区人员-分页
function listByPage_comm(req, res, limit, offset, commId, party) {
  var PartyBuildInstructorMember = sequelize.model('PartyBuildInstructorMember');
  var where;
  if (party) {
    where = {
      where: {
        communityIds: {
          $like: '%' + commId + '%'
        },
        party: party
      },
      limit: [limit, offset],
      order: 'id DESC'
    };
  } else {
    where = {
      where: {
        communityIds: {
          $like: '%' + commId + '%'
        }
      },
      limit: [limit, offset],
      order: 'id DESC'
    };
  }

  PartyBuildInstructorMember.findAll(where).then(function (partyBuildInstructorMember) {
    return res.jsonp(partyBuildInstructorMember);
  }).catch(function (err) {
    logger.error('PartyBuildInstructorMember list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from PartyBuildInstructorMember where party = ' + party;
  } else {
    sql = 'select count(*) sum from PartyBuildInstructorMember';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//-----社区----总数
function listCount_comm(req, res, commId, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from PartyBuildInstructorMember where party = ' + party + ' and find_in_set(' + commId + ', communityIds)';
  } else {
    sql = 'select count(*) sum from PartyBuildInstructorMember where find_in_set(' + commId + ', communityIds)';
  }
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
  var commId = req.query.communityId;
  var PartyBuildInstructorMember = sequelize.model('PartyBuildInstructorMember');
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      if (party) {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0), party);
      } else {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
      }
    } else {
      if (party) {
        listByPage(req, res, limit, offset, party);
      } else {
        listByPage(req, res, limit, offset);
      }
    }
    // listByPage(req, res, limit, offset, party);
  } else if (limit === 0 && offset === 0 && id === '0') {
    // listCount(req, res, party);
    if (commId !== '') {
      if (party) {
        listCount_comm(req, res, parseInt(commId, 0), party);
      } else {
        listCount_comm(req, res, parseInt(commId, 0));
      }
    } else {
      if (party) {
        listCount(req, res, party);
      } else {
        listCount(req, res);
      }
    }
  } else if (id !== '0') {
    PartyBuildInstructorMember.findOne({
      where: {id: id}
    }).then(function (partyBuildInstructorMember) {
      if (!partyBuildInstructorMember) {
        logger.error('No PartyBuildInstructorMember with that identifier has been found');
        return res.status(404).send({
          message: 'No PartyBuildInstructorMember with that identifier has been found'
        });
      }
      req.model = partyBuildInstructorMember;
      next();
    }).catch(function (err) {
      logger.error('PartyBuildInstructorMember ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
