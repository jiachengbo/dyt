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
var saveDir = 'publicproject';
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
 * Create an publicproject
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var Publicproject = sequelize.model('Publicproject');
  var publicproject = Publicproject.build(req.body);

  publicproject.user_id = req.user.id;
  publicproject.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return publicproject.reload({

    })
    .then(function() {
      res.json(publicproject);
    });
  }).catch(function (err) {
    logger.error('publicproject create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current publicproject
 */
exports.read = function (req, res) {
  var publicproject = req.model ? req.model.toJSON() : {};

  //publicproject.isCurrentUserOwner = !!(req.user && publicproject.user && publicproject.user._id.toString() === req.user._id.toString());
  publicproject.isCurrentUserOwner = !!(req.user && publicproject.user && publicproject.user.id.toString() === req.user.id.toString());

  res.json(publicproject);
};

/**
 * Update an publicproject
 */
exports.update = function (req, res) {
  // var Publicproject = sequelize.model('Publicproject');
  // var publicproject = Publicproject.build(req.body);
  var publicproject;
  var Publicproject;
  var existingImageUrl;
  var existingFileUrl;
  var existingImagejpg;
  var newingFileUrl;
  var newingImageUrl;
  if (req.model) {
    publicproject = req.model;
  } else {
    Publicproject = sequelize.model('Publicproject');
    publicproject = Publicproject.build(req.body);
  }
  if (publicproject) {
    existingImageUrl = publicproject.photo;
    existingFileUrl = publicproject.file_path;
    uploadImage.recv(req, res, [
      {name: 'photo'}, {name: 'file_path'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(publicproject);
      })
      .catch(function (err) {
        logger.error('recv upload publicproject picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'publicproject is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      console.log(req.body);
      if (publicproject) {
        if (files && files.photo && files.photo.length === 1) {
          publicproject.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = publicproject.photo;
        }
        publicproject.title = req.body.title;
        publicproject.starlevel = req.body.starlevel;
        publicproject.community = req.body.community;
        // publicproject.intro = req.body.intro;
        // publicproject.projectsource = req.body.projectsource;
        // publicproject.sbtime = req.body.sbtime;
        publicproject.projecttype = req.body.projecttype;
        // publicproject.benefitnum = req.body.benefitnum;
        // publicproject.endtime = req.body.endtime;
        // publicproject.claimunit = req.body.claimunit;
        // publicproject.claimperson = req.body.claimperson;
        // publicproject.chargeperson = req.body.chargeperson;
        // publicproject.measure = req.body.measure;
        //文件
        if (files && files.file_path && files.file_path.length === 1) {
          existingImagejpg = path.join(mountDir1, files.file_path[0].filename).replace(/\\/g, '/');
          var diskFileName = path.join(diskDir1, files.file_path[0].filename);
          fs.exists(diskFileName, function (exists) {
            if (!exists) {
              logger.warn('conv docfile %s not exists', diskFileName);
              return res.status(404).send('参数文件不存在:' + diskFileName);
            }
            var type = distType + (typeParam[distType] ? typeParam[distType] : '');
            var cmdLine = util.format('"%s" --headless --convert-to "%s"  --outdir "%s" "%s"',
              config.sofficePathName, type, diskDir1, diskFileName);
            child_process.exec(cmdLine, function (error, stdout, stderr) {
              if (error) {
                logger.warn('conv docfile %s to pdf error:', diskFileName, error.message);
                return res.status(404).send('文件转换错误:' + diskFileName);
              }

              var distFile = path.basename(files.file_path[0].filename, path.extname(files.file_path[0].filename)) + '.' + distType;
              var distFileName = path.join(diskDir1, distFile);
              // aaa = distFileName.replace(/\\/g, '/');
              fs.exists(distFileName, function (exists) {
                if (!exists) {
                  return res.status(404).send('转换后的文件不存在:' + distFileName);
                }
                var options = {};
                var distFileName1 = path.join(uploadImage.mountDir, distFile).replace(/\\/g, '/');
                newingFileUrl = distFileName1;
                publicproject.file_path = distFileName1;
                publicproject.save().then(function () {
                  return publicproject.reload()
                    .then(function () {
                      resolve();
                    });
                }).catch(function (err) {
                  reject(err);
                });
              });
            });
          });
        }
        if (!(files && files.file_path && files.file_path.length === 1)) {
          publicproject.save().then(function () {
            return publicproject.reload()
              .then(function () {
                resolve();
              });
          }).catch(function (err) {
            reject(err);
          });
        }
      } else {
        reject(new Error('no publicproject img upload'));
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
 * Delete an publicproject
 */
exports.delete = function (req, res) {
  var publicproject = req.model;

  publicproject.destroy().then(function () {
    res.json(publicproject);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Publicproject
 */
exports.list = function (req, res) {
  var Publicproject = sequelize.model('Publicproject');
  var User = sequelize.model('User');

  Publicproject.findAll({
    order: 'id ASC'
  }).then(function (publicproject) {
    return res.jsonp(publicproject);
  }).catch(function (err) {
    logger.error('publicproject list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Publicproject middleware
 */
exports.publicprojectByID = function (req, res, next, id) {
  var Publicproject = sequelize.model('Publicproject');
  var User = sequelize.model('User');

  Publicproject.findOne({
    where: {id: id}
  }).then(function (publicproject) {
    if (!publicproject) {
      logger.error('No publicproject with that identifier has been found');
      return res.status(404).send({
        message: 'No publicproject with that identifier has been found'
      });
    }

    req.model = publicproject;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('publicproject ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
