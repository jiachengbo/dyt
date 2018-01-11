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
var saveDir = 'littleWish';
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
 * Create an littlewish
 */
exports.create = function (req, res) {
  var Littlewish = sequelize.model('Littlewish');
  var littlewish = Littlewish.build(req.body);
  littlewish.state = '未审核';
  littlewish.fbtime = new Date();
  littlewish.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return littlewish.reload({})
      .then(function () {
        res.json(littlewish);
      });
  }).catch(function (err) {
    logger.error('littlewish create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current littlewish
 */
exports.read = function (req, res) {
  var littlewish = req.model ? req.model.toJSON() : {};

  //littlewish.isCurrentUserOwner = !!(req.user && littlewish.user && littlewish.user._id.toString() === req.user._id.toString());
  littlewish.isCurrentUserOwner = !!(req.user && littlewish.user && littlewish.user.id.toString() === req.user.id.toString());

  res.json(littlewish);
};

/**
 * Update an littlewish
 */
// exports.update = function (req, res) {
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//   var littlewish = req.model;
//   littlewish.title = req.body.title;
//   littlewish.content = req.body.content;
//   littlewish.community = req.body.community;
//   littlewish.state = req.body.state;
//   littlewish.claimperson = req.body.claimperson;
//   littlewish.fbperson = req.body.fbperson;
//   littlewish.IDcard = req.body.IDcard;
//   littlewish.tel = req.body.tel;
//   littlewish.claimpersonID = req.body.claimpersonID;
//   littlewish.claimphone = req.body.claimphone;
//   littlewish.feelings = req.body.feelings;
//   littlewish.save().then(function () {
//     return littlewish.reload({
//       include: [
//         {
//           model: CommunityVillageConstant,
//           attributes: ['name']
//         }
//       ],
//       order: 'id ASC'
//     })
//       .then(function () {
//         res.json(littlewish);
//       });
//   }).catch(function (err) {
//     return res.status(422).send({
//       message: errorHandler.getErrorMessage(err)
//     });
//   });
// };
exports.update = function (req, res) {
  // var Littlewish = sequelize.model('Littlewish');
  // var littlewish = Littlewish.build(req.body);
  var littlewish;
  var Littlewish;
  var existingImageUrl;
  var existingFileUrl;
  var existingImagejpg;
  var newingFileUrl;
  var newingImageUrl;
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  if (req.model) {
    littlewish = req.model;
  } else {
    Littlewish = sequelize.model('Littlewish');
    littlewish = Littlewish.build(req.body);
    littlewish.fbtime = new Date();
  }
  if (littlewish) {
    existingImageUrl = littlewish.photo;
    // existingFileUrl = littlewish.file_path;
    uploadImage.recv(req, res, [
      {name: 'endphoto'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(littlewish);
      })
      .catch(function (err) {
        logger.error('recv upload littlewish picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'littlewish is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (littlewish) {
        if (files && files.endphoto && files.endphoto.length === 1) {
          littlewish.endphoto = path.join(uploadImage.mountDir, files.endphoto[0].filename).replace(/\\/g, '/');
          newingImageUrl = littlewish.endphoto;
        }
        littlewish.title = req.body.title;
        littlewish.content = req.body.content;
        littlewish.community = req.body.community;
        littlewish.state = req.body.state || '待审核';
        littlewish.claimperson = req.body.claimperson || '';
        littlewish.fbperson = req.body.fbperson;
        littlewish.IDcard = req.body.IDcard;
        littlewish.tel = req.body.tel;
        littlewish.claimpersonID = req.body.claimpersonID || '';
        littlewish.claimphone = req.body.claimphone || '';
        littlewish.feelings = req.body.feelings || '';

        if (req.body.claimperson) {
          littlewish.claimtime = new Date();
        }
        if (littlewish.claimperson !== '') {
          littlewish.state = '实施中';
        }
        if (littlewish.feelings !== '') {
          littlewish.state = '已完成';
        }
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
        //         littlewish.file_path = distFileName1;
        //         littlewish.save().then(function () {
        //           return littlewish.reload()
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
          // littlewish.save().then(function () {
          //   return littlewish.reload()
          //     .then(function () {
          //       resolve();
          //     });
          // }).catch(function (err) {
          //   reject(err);
          // });
          littlewish.save().then(function () {
            return littlewish.reload({
              include: [
                {
                  model: CommunityVillageConstant,
                  attributes: ['name']
                }
              ],
              order: 'id ASC'
            })
              .then(function () {
                res.json(littlewish);
              });
          }).catch(function (err) {
            return res.status(422).send({
              message: errorHandler.getErrorMessage(err)
            });
          });
        }
      } else {
        reject(new Error('no littlewish img upload'));
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
 * Delete an littlewish
 */
exports.delete = function (req, res) {
  var littlewish = req.model;

  littlewish.destroy().then(function () {
    res.json(littlewish);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Littlewish
 */
exports.list = function (req, res) {
  var Littlewish = sequelize.model('Littlewish');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var state = req.query.state;
  Littlewish.findAll({
    where: {
      state: state
    },
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    order: 'id ASC'
  }).then(function (littlewish) {
    return res.jsonp(littlewish);
  }).catch(function (err) {
    logger.error('littlewish list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Littlewish middleware
 */
exports.littlewishByID = function (req, res, next, id) {
  var Littlewish = sequelize.model('Littlewish');
  var User = sequelize.model('User');

  Littlewish.findOne({
    where: {id: id}
  }).then(function (littlewish) {
    if (!littlewish) {
      logger.error('No littlewish with that identifier has been found');
      return res.status(404).send({
        message: 'No littlewish with that identifier has been found'
      });
    }
    req.model = littlewish;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('littlewish ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
