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

var saveDir = 'TradeUnionActivitiesPicfileimg';
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
  100 * 1024 * 1024,
  /doc/, '.doc');
//创建目录
uploadImage.mkPaths();

var uploadImage1 = new multer(saveDir,
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage1.mkPaths();
/**
 * Create an TradeUnionActivitiesTable
 */
// exports.create = function (req, res) {
//   var tradeUnionActivitiesTable = sequelize.model('TradeUnionActivitiesTable');
//   var TradeUnionActivitiesTable = tradeUnionActivitiesTable.build(req.body);
//   var newingImageUrl;
//   if (TradeUnionActivitiesTable) {
//     uploadImage.recv(req, res, [
//       {name: 'photos'}
//     ])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(TradeUnionActivitiesTable);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'TradeUnionActivitiesTable is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (TradeUnionActivitiesTable) {
//         if (files && files.photos && files.photos.length === 1) {
//           TradeUnionActivitiesTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
//           newingImageUrl = TradeUnionActivitiesTable.photos;
//         }
//         TradeUnionActivitiesTable.name = req.body.name;
//         TradeUnionActivitiesTable.type = req.body.type;
//         TradeUnionActivitiesTable.content = req.body.content;
//         TradeUnionActivitiesTable.time = req.body.time;
//         TradeUnionActivitiesTable.createdate = new Date();
//         //图片
//         TradeUnionActivitiesTable.save().then(function () {
//           //重新加载数据，使数据含有关联表的内容
//           return TradeUnionActivitiesTable.reload()
//             .then(function () {
//               resolve();
//             });
//         }).catch(function (err) {
//           reject(err);
//         });
//       } else {
//         reject(new Error('no TradeUnionActivitiesTable img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current TradeUnionActivitiesTable
 */
exports.read = function (req, res) {
  var TradeUnionActivitiesTable = req.model ? req.model.toJSON() : {};

  //TradeUnionActivitiesTable.isCurrentUserOwner = !!(req.user && TradeUnionActivitiesTable.user && TradeUnionActivitiesTable.user._id.toString() === req.user._id.toString());
  TradeUnionActivitiesTable.isCurrentUserOwner = !!(req.user && TradeUnionActivitiesTable.user && TradeUnionActivitiesTable.user.id.toString() === req.user.id.toString());

  res.json(TradeUnionActivitiesTable);
};

/**
 * Update an TradeUnionActivitiesTable
 */
exports.update = function (req, res) {
  var newingImageUrl;
  var TradeUnionActivitiesTable;
  var existingImageUrl;
  var newingFileUrl;
  var existingFileUrl;
  var existingImagejpg;
  var tradeUnionActivitiesTable;
  if (req.model) {
    TradeUnionActivitiesTable = req.model;
  } else {
    tradeUnionActivitiesTable = sequelize.model('TradeUnionActivitiesTable');
    TradeUnionActivitiesTable = tradeUnionActivitiesTable.build(req.body);
  }
  if (TradeUnionActivitiesTable) {
    existingImageUrl = TradeUnionActivitiesTable.photos;
    existingFileUrl = TradeUnionActivitiesTable.file_path;
    uploadImage1.recv(req, res, [
      {name: 'photos'}, {name: 'file_path'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(TradeUnionActivitiesTable);
      })
      .catch(function (err) {
        logger.error('recv upload TradeUnionActivitiesTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'TradeUnionActivitiesTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (TradeUnionActivitiesTable) {
        if (files && files.photos && files.photos.length === 1) {
          TradeUnionActivitiesTable.photos = path.join(uploadImage1.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = TradeUnionActivitiesTable.photos;
        }
        TradeUnionActivitiesTable.name = req.body.name;
        TradeUnionActivitiesTable.type = req.body.type;
        TradeUnionActivitiesTable.content = req.body.content;
        TradeUnionActivitiesTable.time = req.body.time;
        TradeUnionActivitiesTable.createdate = new Date();
        //图片
        if (files && files.file_path && files.file_path.length === 1) {
          existingImagejpg = path.join(mountDir1, files.file_path[0].filename).replace(/\\/g, '/');
          // newingFileUrl = womenInformationManagement.file_path;
          //  转HTML
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
                TradeUnionActivitiesTable.file_path = distFileName1;
                TradeUnionActivitiesTable.save().then(function () {
                  resolve();
                }).catch(function (err) {
                  reject(err);
                });
              });
            });
          });
        }
        //图片
        if (!(files && files.file_path && files.file_path.length === 1)) {
          // TradeUnionActivitiesTable.save().then(function () {
          //   return TradeUnionActivitiesTable.reload()
          //     .then(function () {
          //       resolve();
          //     });
          // }).catch(function (err) {
          //   reject(err);
          // });
          TradeUnionActivitiesTable.save().then(function () {
            resolve();
          }).catch(function (err) {
            reject(err);
          });
        }
      } else {
        reject(new Error('no TradeUnionActivitiesTable img upload'));
      }
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (existingImagejpg) {
        var oldimgname2 = existingImagejpg.replace(uploadImage.mountDir, uploadImage1.diskDir);
        fs.unlink(oldimgname2, function (unlinkError) {
        });
      }
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
      if (existingImageUrl && newingImageUrl && existingFileUrl && newingFileUrl) {
        var oldfilename3 = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        var oldimgname1 = existingFileUrl.replace(uploadImage.mountDir, uploadImage1.diskDir);
        fs.unlink(oldimgname1, function (unlinkError) {
        });
        fs.unlink(oldfilename3, function (unlinkError) {
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
    });
  }
};

/**
 * Delete an TradeUnionActivitiesTable
 */
exports.delete = function (req, res) {
  var TradeUnionActivitiesTable = req.model;

  TradeUnionActivitiesTable.destroy().then(function () {
    res.json(TradeUnionActivitiesTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of TradeUnionActivitiesTable
 */
exports.list = function (req, res) {
  var TradeUnionActivitiesTable = sequelize.model('TradeUnionActivitiesTable');

  TradeUnionActivitiesTable.findAll({
    order: 'createdate DESC'
  }).then(function (TradeUnionActivitiesTable) {
    return res.jsonp(TradeUnionActivitiesTable);
  }).catch(function (err) {
    logger.error('TradeUnionActivitiesTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * TradeUnionActivitiesTable middleware
 */
exports.tradeunionactivitiesinfoIdByID = function (req, res, next, id) {
  var TradeUnionActivitiesTable = sequelize.model('TradeUnionActivitiesTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    TradeUnionActivitiesTable.findOne({
      where: {id: id}
    }).then(function (TradeUnionActivitiesTable) {
      if (!TradeUnionActivitiesTable) {
        logger.error('No TradeUnionActivitiesTable with that identifier has been found');
        return res.status(404).send({
          message: 'No TradeUnionActivitiesTable with that identifier has been found'
        });
      }

      req.model = TradeUnionActivitiesTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('TradeUnionActivitiesTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var TradeUnionActivitiesTable = sequelize.model('TradeUnionActivitiesTable');
  TradeUnionActivitiesTable.findAll({
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (YLC_activitiesTypeTable) {
    return res.jsonp(YLC_activitiesTypeTable);
  }).catch(function (err) {
    logger.error('YLC_activitiesTypeTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from TradeUnionActivitiesTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
