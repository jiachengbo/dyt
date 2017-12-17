'use strict';

/**
 * Module dependencies
 */
/*var path = require('path'),
 errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
 sequelize = require(path.resolve('./config/lib/sequelize')),
 logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);*/
var path = require('path'),
  fs = require('fs'),
  multer = require(path.resolve('./config/private/multer')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  config = require(path.resolve('./config/config')),
  // util = require('util'),
  //child_process = require('child_process'),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an partyyl
 */
var uploadImage = new multer('partyyl',
  100 * 1024 * 1024,
  /image/, '.html');
//创建目录
uploadImage.mkPaths();
exports.create = function (req, res) {
  //var User = sequelize.model('User');
  var Partyyl = sequelize.model('Partyyl');
  var partyyl = Partyyl.build(req.body);

  // partyyl.user_id = req.user.id;
  partyyl.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return partyyl.reload(/*{
     include: [
     {
     model: User,
     attributes: ['displayName']
     }
     ]
     }*/)
      .then(function () {
        res.json(partyyl);
      });
  }).catch(function (err) {
    logger.error('partyyl create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current partyyl
 */
exports.read = function (req, res) {
  var partyyl = req.model ? req.model.toJSON() : {};

  //partyyl.isCurrentUserOwner = !!(req.user && partyyl.user && partyyl.user._id.toString() === req.user._id.toString());
  partyyl.isCurrentUserOwner = !!(req.user && partyyl.user && partyyl.user.id.toString() === req.user.id.toString());

  res.json(partyyl);
};

/**
 * Update an partyyl
 */
exports.update = function (req, res) {
  var partyyl;
  var existingImageUrl;
  var newingImageUrl;
  var newingFileUrl;
  var existingFileUrl;
  var existingImagejpg;
  if (req.model) {
    partyyl = req.model;
  } else {
    partyyl = sequelize.model('Partyyl');
    partyyl = partyyl.build(req.body);
    partyyl.createdate = new Date();
  }
  if (partyyl) {
    existingImageUrl = partyyl.photo;
    existingFileUrl = partyyl.file_path;
    uploadImage.recv(req, res, [{name: 'photo'}, {name: 'file_path'}])
      .then(updateUserInfo)
      //.then(deleteOldImage)
      .then(function () {
        res.json(partyyl);
      })
      .catch(function (err) {
        logger.error('recv upload partyyl picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'partyyl is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (partyyl) {
        if (files && files.photo && files.photo.length === 1) {
          partyyl.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = partyyl.photo;
        }
        if (files && files.file_path && files.file_path.length === 1) {
          partyyl.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          newingImageUrl = partyyl.file_path;
        }
        partyyl.title = req.body.title;
        partyyl.content = req.body.content;
        partyyl.type = req.body.type;
        partyyl.typeId = req.body.typeId;
        partyyl.partytype = req.body.partytype;
        partyyl.starttime = req.body.starttime;
        partyyl.endtime = req.body.endtime;
        partyyl.departmentid = req.body.departmentid;
        partyyl.communityid = req.body.communityid;
        partyyl.head = req.body.head;
        partyyl.peoplenum = req.body.peoplenum;
        partyyl.phone = req.body.phone;
        partyyl.address = req.body.address;
        partyyl.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no partyyl photo img upload'));
      }
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (existingImagejpg) {
        var oldImageName = existingImagejpg.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldImageName, function (unlinkError) {
        });
      }
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
      if (existingFileUrl && newingFileUrl) {
        var oldfile = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfile, function (unlinkError) {
          if (unlinkError) {
            resolve();
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
      if (existingFileUrl && newingFileUrl && existingImageUrl && newingImageUrl) {
        var oldfilename1 = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        // console.log(oldfilename1);
        var oldImageName1 = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldImageName1, function (unlinkError) {
        });
        fs.unlink(oldfilename1, function (unlinkError) {
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
 * Delete an partyyl
 */
exports.delete = function (req, res) {
  var partyyl = req.model;

  partyyl.destroy().then(function () {
    res.json(partyyl);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Partyyl
 */
exports.list = function (req, res) {
  var Partyyl = sequelize.model('Partyyl');
  var isqian = req.query.isqiantai;
  var typeId = req.query.typeId;
  var offset = req.query.offset;
  var count = req.query.count;
  var where;
  if (count) {
    Partyyl.findAll(
      {
        attributes: {include: [[sequelize.fn('COUNT', sequelize.col('id')), 'sum']]}
      }
    ).then(function (partyyl) {
      return res.jsonp(partyyl);
    }).catch(function (err) {
      logger.error('partyyl list error:', err);
      return res.status(422).send(err);
    });
  } else {
    if (isqian) {
      where = {
        where: {typeId: typeId},
        limit: 6,
        offset: 0,
        order: 'id desc'
      };
      get(where);
    } else {
      where = {
        limit: 20,
        offset: (offset - 1) * 20,
        order: 'id desc'
      };
      get(where);
    }
  }
  function get(data) {
    Partyyl.findAll(data).then(function (partyyl) {
      return res.jsonp(partyyl);
    }).catch(function (err) {
      logger.error('partyyl list error:', err);
      return res.status(422).send(err);
    });
  }
};

/**
 * Partyyl middleware
 */
exports.partyylByID = function (req, res, next, id) {
  var Partyyl = sequelize.model('Partyyl');
  // var User = sequelize.model('User');
  Partyyl.findOne({
    where: {id: id}/*,
     include: [
     {
     model: User,
     attributes: ['displayName']
     }
     ]*/
  }).then(function (partyyl) {
    if (!partyyl) {
      logger.error('No partyyl with that identifier has been found');
      return res.status(404).send({
        message: 'No partyyl with that identifier has been found'
      });
    }

    req.model = partyyl;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('partyyl ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
