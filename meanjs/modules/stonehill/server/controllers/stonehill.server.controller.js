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
  util = require('util'),
  child_process = require('child_process'),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);
//创建项目进展对象
var saveDir = 'Stonehill';
var diskDir1 = path.resolve(config.uploads.rootDiskDir, saveDir);
var mountDir1 = path.join(config.uploads.rootMountDir, saveDir).replace(/\\/g, '/');
//目标文件类型
var distType = 'html';
//不同类型参数
var typeParam = {
  //html 字符集utf-8
  html: ':XHTML Writer File:UTF8'
};
var uploadImage = new multer(saveDir,
  10 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();
/**
 * Create an stonehill
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var Stonehill = sequelize.model('Stonehill');
  var stonehill = Stonehill.build(req.body);
  stonehill.time = new Date();
  stonehill.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return stonehill.reload({
    })
    .then(function() {
      res.json(stonehill);
    });
  }).catch(function (err) {
    logger.error('stonehill create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current stonehill
 */
exports.read = function (req, res) {
  var stonehill = req.model ? req.model.toJSON() : {};

  //stonehill.isCurrentUserOwner = !!(req.user && stonehill.user && stonehill.user._id.toString() === req.user._id.toString());
  stonehill.isCurrentUserOwner = !!(req.user && stonehill.user && stonehill.user.id.toString() === req.user.id.toString());

  res.json(stonehill);
};

/**
 * Update an stonehill
 */
exports.update = function (req, res) {
  var stonehill = req.model;

  stonehill.title = req.body.title;
  stonehill.content = req.body.content;

  stonehill.save().then(function () {
    res.json(stonehill);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
exports.update = function (req, res) {
  // var Stonehill = sequelize.model('Stonehill');
  // var stonehill = Stonehill.build(req.body);
  var stonehill;
  var Stonehill;
  var existingImageUrl;
  var existingFileUrl;
  var existingImagejpg;
  var newingFileUrl;
  var newingImageUrl;
  if (req.model) {
    stonehill = req.model;
  } else {
    Stonehill = sequelize.model('Stonehill');
    stonehill = Stonehill.build(req.body);
    stonehill.time = new Date();
  }
  if (stonehill) {
    existingImageUrl = stonehill.photo;
    // existingFileUrl = stonehill.file_path;
    uploadImage.recv(req, res, [
      {name: 'photo'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(stonehill);
      })
      .catch(function (err) {
        logger.error('recv upload stonehill picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'stonehill is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (stonehill) {
        if (files && files.photo && files.photo.length === 1) {
          stonehill.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = stonehill.photo;
        }
        stonehill.title = req.body.title;
        stonehill.content = req.body.content;
        stonehill.time = new Date();
        //图片
        // if (files && files.file_path && files.file_path.length === 1) {
        //   existingImagejpg = path.join(mountDir1, files.file_path[0].filename).replace(/\\/g, '/');
        //   var diskFileName = path.join(diskDir1, files.file_path[0].filename);
        //   fs.exists(diskFileName, function (exists) {
        //     if (!exists) {
        //       logger.warn('conv docfile %s not exists', diskFileName);
        //       return res.status(404).send('参数文件不存在:' + diskFileName);
        //     }
        //     var type = distType + (typeParam[distType] ? typeParam[distType] : '');
        //     var cmdLine = util.format('"%s" --headless --convert-to "%s"  --outdir "%s" "%s"',
        //       config.sofficePathName, type, diskDir1, diskFileName);
        //     child_process.exec(cmdLine, function (error, stdout, stderr) {
        //       if (error) {
        //         logger.warn('conv docfile %s to pdf error:', diskFileName, error.message);
        //         return res.status(404).send('文件转换错误:' + diskFileName);
        //       }
        //
        //       var distFile = path.basename(files.file_path[0].filename, path.extname(files.file_path[0].filename)) + '.' + distType;
        //       var distFileName = path.join(diskDir1, distFile);
        //       // aaa = distFileName.replace(/\\/g, '/');
        //       fs.exists(distFileName, function (exists) {
        //         if (!exists) {
        //           return res.status(404).send('转换后的文件不存在:' + distFileName);
        //         }
        //         var options = {};
        //         var distFileName1 = path.join(uploadImage.mountDir, distFile).replace(/\\/g, '/');
        //         newingFileUrl = distFileName1;
        //         stonehill.file_path = distFileName1;
        //         stonehill.save().then(function () {
        //           return stonehill.reload()
        //             .then(function () {
        //               resolve();
        //             });
        //         }).catch(function (err) {
        //           reject(err);
        //         });
        //       });
        //     });
        //   });
        // }
        if (!(files && files.file_path && files.file_path.length === 1)) {
          stonehill.save().then(function () {
            return stonehill.reload()
              .then(function () {
                resolve();
              });
          }).catch(function (err) {
            reject(err);
          });
        }
      } else {
        reject(new Error('no stonehill img upload'));
      }
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (existingImagejpg) {
        var oldjpg = existingImagejpg.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldjpg, function (unlinkError) {
          if (unlinkError) {
            reject({message: 'jpg文件删除错误'});
          }
        });
      }
      if (existingImageUrl && newingImageUrl) {
        var oldfilename = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfilename, function (unlinkError) {
          if (unlinkError) {
            // resolve();
            /**/
            reject({
              message: '图片删除错误'
            });
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
            reject({message: '删除文件错误'});
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
      if (existingImageUrl && newingImageUrl && existingFileUrl && newingFileUrl) {
        var oldfile1 = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfile1, function (unlinkError) {
          if (unlinkError) {
            reject({message: '删除文件错误'});
          }
        });
        var oldfilename1 = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfilename1, function (unlinkError) {
          if (unlinkError) {
            reject({message: '图片删除错误'});
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
 * Delete an stonehill
 */
exports.delete = function (req, res) {
  var stonehill = req.model;

  stonehill.destroy().then(function () {
    res.json(stonehill);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Stonehill
 */
exports.list = function (req, res) {
  var Stonehill = sequelize.model('Stonehill');
  var User = sequelize.model('User');

  Stonehill.findAll({
    order: 'id ASC'
  }).then(function (stonehill) {
    return res.jsonp(stonehill);
  }).catch(function (err) {
    logger.error('stonehill list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Stonehill middleware
 */
exports.stonehillByID = function (req, res, next, id) {
  var Stonehill = sequelize.model('Stonehill');
  var User = sequelize.model('User');

  Stonehill.findOne({
    where: {id: id}
  }).then(function (stonehill) {
    if (!stonehill) {
      logger.error('No stonehill with that identifier has been found');
      return res.status(404).send({
        message: 'No stonehill with that identifier has been found'
      });
    }

    req.model = stonehill;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('stonehill ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
