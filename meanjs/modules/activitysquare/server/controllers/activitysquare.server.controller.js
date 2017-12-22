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
var saveDir = 'activitysquare';
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
  /image/, '.html');
//创建目录
uploadImage.mkPaths();

/**
 * Create an activitysquare
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var Activitysquare = sequelize.model('Activitysquare');
  var activitysquare = Activitysquare.build(req.body);

  activitysquare.user_id = req.user.id;
  activitysquare.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return activitysquare.reload({})
      .then(function () {
        res.json(activitysquare);
      });
  }).catch(function (err) {
    logger.error('activitysquare create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current activitysquare
 */
exports.read = function (req, res) {
  var activitysquare = req.model ? req.model.toJSON() : {};

  //activitysquare.isCurrentUserOwner = !!(req.user && activitysquare.user && activitysquare.user._id.toString() === req.user._id.toString());
  activitysquare.isCurrentUserOwner = !!(req.user && activitysquare.user && activitysquare.user.id.toString() === req.user.id.toString());

  res.json(activitysquare);
};

/**
 * Update an activitysquare
 */
exports.update = function (req, res) {
  var activitysquare;
  var Activitysquare;
  var existingImageUrl;
  var existingFileUrl;
  var existingImagejpg;
  var newingFileUrl;
  var newingImageUrl;
  if (req.model) {
    activitysquare = req.model;
  } else {
    Activitysquare = sequelize.model('Activitysquare');
    activitysquare = Activitysquare.build(req.body);
  }
  if (activitysquare) {
    existingFileUrl = activitysquare.file_path;
    uploadImage.recv(req, res, [
      {name: 'file_path'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(activitysquare);
      })
      .catch(function (err) {
        logger.error('recv upload activitysquare picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'activitysquare is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (activitysquare) {
        if (files && files.file_path && files.file_path.length === 1) {
          activitysquare.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          newingImageUrl = activitysquare.file_path;
        }
        activitysquare.title = req.body.title;
        activitysquare.hostunit = req.body.hostunit;
        activitysquare.underunit = req.body.underunit;
        activitysquare.fbtime = req.body.fbtime;
        activitysquare.starttime = req.body.starttime;
        activitysquare.endtime = req.body.endtime;
        activitysquare.address = req.body.address;
        activitysquare.peoplenum = req.body.peoplenum;
        activitysquare.applytime = req.body.applytime;
        activitysquare.applyendtime = req.body.applyendtime;
        //文件
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
        //         activitysquare.file_path = distFileName1;
        //         activitysquare.save().then(function () {
        //           return activitysquare.reload()
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
        activitysquare.save().then(function () {
          return activitysquare.reload()
            .then(function () {
              resolve();
            });
        }).catch(function (err) {
          reject(err);
        });
        // if (!(files && files.file_path && files.file_path.length === 1)) {
        //   activitysquare.save().then(function () {
        //     return activitysquare.reload()
        //       .then(function () {
        //         resolve();
        //       });
        //   }).catch(function (err) {
        //     reject(err);
        //   });
        // }
      } else {
        reject(new Error('no activitysquare img upload'));
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
 * Delete an activitysquare
 */
exports.delete = function (req, res) {
  var activitysquare = req.model;

  activitysquare.destroy().then(function () {
    res.json(activitysquare);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Activitysquare
 */
exports.list = function (req, res) {
  var Activitysquare = sequelize.model('Activitysquare');
  var Activitcy = sequelize.model('Activitcy');
  var iscanyu = req.query.iscanyu;
  var where;
  var shuzu;
  //var User = sequelize.model('User');
  if (iscanyu) {
    getact();
  } else {
    where = {
      order: 'id ASC'
    };
    getdata(where);
  }
  function getact() {
    Activitcy.findAll({
      userid: req.user.id
    }).then(function (activitc) {
      shuzu = [];
      if (activitc.length > 0) {
        activitc.forEach(function (v, k) {
          shuzu.push(v.dataValues.activitID);
        });
        if (iscanyu === '我未参与') {
          getdatas(1, shuzu);
        } else {
          getdatas(2, shuzu);
        }
      }
      //console.log(activitc[0].dataValues, activitc[1].dataValues);
      //return res.jsonp(arr);
      // getdatas();
    }).catch(function (err) {
      logger.error('activitysquare list error:', err);
      return res.status(422).send(err);
    });
  }

  function getdatas(num, shuzu) {
    var tiaojian;
    if (num === 2) {
      tiaojian = {
        where: {
          id: shuzu
        }
      };
    } else {
      tiaojian = {
        where: {
          id: {$notIn: shuzu}
        }
      };
    }
    Activitysquare.findAll(tiaojian).then(function (activitysquare) {
      return res.jsonp(activitysquare);
    }).catch(function (err) {
      logger.error('activitysquare list error:', err);
      return res.status(422).send(err);
    });
  }

  function getdata() {
    Activitysquare.findAll(where).then(function (activitysquare) {
      return res.jsonp(activitysquare);
    }).catch(function (err) {
      logger.error('activitysquare list error:', err);
      return res.status(422).send(err);
    });
  }
};

/**
 * Activitysquare middleware
 */
exports.activitysquareByID = function (req, res, next, id) {
  var Activitysquare = sequelize.model('Activitysquare');
  var User = sequelize.model('User');

  Activitysquare.findOne({
    where: {id: id}
  }).then(function (activitysquare) {
    if (!activitysquare) {
      logger.error('No activitysquare with that identifier has been found');
      return res.status(404).send({
        message: 'No activitysquare with that identifier has been found'
      });
    }
    req.model = activitysquare;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('activitysquare ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
exports.active = function (req, res) {
  var Activitcy = sequelize.model('Activitcy');
  Activitcy.create(req.query).then(function (activitc) {
    var arr = [];
    arr.push(activitc.dataValues);
    return res.jsonp(arr);
  }).catch(function (err) {
    logger.error('activitysquare list error:', err);
    return res.status(422).send(err);
  });
};
