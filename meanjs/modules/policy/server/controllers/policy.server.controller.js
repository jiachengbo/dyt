'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  multer = require(path.resolve('./config/private/multer')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  config = require(path.resolve('./config/config')),
  // util = require('util'),
  //child_process = require('child_process'),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

var uploadImage = new multer('policypath',
  100 * 1024 * 1024,
  /image/, '.html');
//创建目录
uploadImage.mkPaths();
/**
 * Create an policy
 */
exports.create = function (req, res) {
  //var User = sequelize.model('User');
  var Policy = sequelize.model('Policy');
  var policy = Policy.build(req.body);

  //policy.user_id = req.user.id;
  policy.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return policy.reload(/*{
      include: [
        {
          model: User,
          attributes: ['displayName']
        }
      ]
    }*/)
    .then(function() {
      res.json(policy);
    });
  }).catch(function (err) {
    logger.error('policy create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current policy
 */
exports.read = function (req, res) {
  var policy = req.model ? req.model.toJSON() : {};

  //policy.isCurrentUserOwner = !!(req.user && policy.user && policy.user._id.toString() === req.user._id.toString());
  policy.isCurrentUserOwner = !!(req.user && policy.user && policy.user.id.toString() === req.user.id.toString());

  res.json(policy);
};

/**
 * Update an policy
 */
exports.update = function (req, res) {
  var policy;
  var existingImageUrl;
  var newingImageUrl;
  var newingFileUrl;
  var existingFileUrl;
  var existingImagejpg;
  if (req.model) {
    policy = req.model;
  } else {
    policy = sequelize.model('Policy');
    policy = policy.build(req.body);
  }
  if (policy) {
    existingImageUrl = policy.photo;
    existingFileUrl = policy.file_path;
    uploadImage.recv(req, res, [{name: 'file_path'}])
      .then(updateUserInfo)
      //.then(deleteOldImage)
      .then(function () {
        res.json(policy);
      })
      .catch(function (err) {
        logger.error('recv upload policy picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'policy is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (policy) {
        if (files && files.file_path && files.file_path.length === 1) {
          policy.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          newingImageUrl = policy.file_path;
        }
        policy.title = req.body.title;
        policy.content = req.body.content;
        policy.type = req.body.type;
        policy.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no policy photo img upload'));
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
/*exports.update = function (req, res) {
  var policy = req.model;

  policy.title = req.body.title;
  policy.content = req.body.content;
  policy.type = req.body.type;
  policy.save().then(function () {
    res.json(policy);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};*/

/**
 * Delete an policy
 */
exports.delete = function (req, res) {
  var policy = req.model;

  policy.destroy().then(function () {
    res.json(policy);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Policy
 */
exports.list = function (req, res) {
  var Policy = sequelize.model('Policy');
  var type = req.query.type;
  var isqian = req.query.isqiantai;
  var offset = req.query.offset;
  var count = req.query.count;
  var where;
  if (count) {
    Policy.findAll(
      {
        where: {type: type},
        attributes: {include: [[sequelize.fn('COUNT', sequelize.col('id')), 'sum']]}
      }
    ).then(function (partyyl) {
      return res.jsonp(partyyl);
    }).catch(function (err) {
      logger.error('partyyl list error:', err);
      return res.status(422).send(err);
    });
  }else {
    if (isqian) {
      where = {
        where: {type: type},
        limit: 6,
        offset: 0,
        order: 'id desc'
      };
      getdat(where);
    } else {
      where = {
        where: {type: type},
        limit: 20,
        offset: (offset - 1) * 20,
        order: 'id desc'
      };
      getdat(where);
    }
  }
  function getdat(where) {
    Policy.findAll(where).then(function (policy) {
      return res.jsonp(policy);
    }).catch(function (err) {
      logger.error('policy list error:', err);
      return res.status(422).send(err);
    });
  }
};

/**
 * Policy middleware
 */
exports.policyByID = function (req, res, next, id) {
  var Policy = sequelize.model('Policy');
  //var User = sequelize.model('User');

  Policy.findOne({
    where: {id: id}/*,
    include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ]*/
  }).then(function (policy) {
    if (!policy) {
      logger.error('No policy with that identifier has been found');
      return res.status(404).send({
        message: 'No policy with that identifier has been found'
      });
    }

    req.model = policy;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('policy ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
