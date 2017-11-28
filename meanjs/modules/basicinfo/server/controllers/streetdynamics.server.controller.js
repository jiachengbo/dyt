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
var saveDir = 'StreetDynamicsPicfileimg';
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
  /image/, '.html');
//创建目录
uploadImage.mkPaths();
/**
 * Create an StreetDynamicsTable
 */
// exports.create = function (req, res) {
//   var streetDynamicsTable = sequelize.model('StreetDynamicsTable');
//   var StreetDynamicsTable = streetDynamicsTable.build(req.body);
//   var newingImageUrl;
//   if (StreetDynamicsTable) {
//     uploadImage.recv(req, res, [
//       {name: 'photos'}
//     ])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(StreetDynamicsTable);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'StreetDynamicsTable is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (StreetDynamicsTable) {
//         if (files && files.photos && files.photos.length === 1) {
//           StreetDynamicsTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
//           newingImageUrl = StreetDynamicsTable.photos;
//         }
//         StreetDynamicsTable.title = req.body.title;
//         StreetDynamicsTable.content = req.body.content;
//         StreetDynamicsTable.time = req.body.time;
//         StreetDynamicsTable.ispush = req.body.ispush;
//         StreetDynamicsTable.createdate = new Date();
//         //图片
//         StreetDynamicsTable.save().then(function () {
//           //重新加载数据，使数据含有关联表的内容
//           return StreetDynamicsTable.reload()
//             .then(function () {
//               resolve();
//             });
//         }).catch(function (err) {
//           reject(err);
//         });
//       } else {
//         reject(new Error('no StreetDynamicsTable img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current StreetDynamicsTable
 */
exports.read = function (req, res) {
  var StreetDynamicsTable = req.model ? req.model.toJSON() : {};

  //StreetDynamicsTable.isCurrentUserOwner = !!(req.user && StreetDynamicsTable.user && StreetDynamicsTable.user._id.toString() === req.user._id.toString());
  StreetDynamicsTable.isCurrentUserOwner = !!(req.user && StreetDynamicsTable.user && StreetDynamicsTable.user.id.toString() === req.user.id.toString());

  res.json(StreetDynamicsTable);
};

/**
 * Update an StreetDynamicsTable
 */
exports.update = function (req, res) {
  var StreetDynamicsTable;
  var existingImageUrl;
  var existingFileUrl;
  var existingImagejpg;
  var newingImageUrl;
  var newingFileUrl;
  var streetDynamicsTable;
  if (req.model) {
    StreetDynamicsTable = req.model;
  } else {
    streetDynamicsTable = sequelize.model('StreetDynamicsTable');
    StreetDynamicsTable = streetDynamicsTable.build(req.body);
    StreetDynamicsTable.createdate = new Date();
  }
  if (StreetDynamicsTable) {
    existingImageUrl = StreetDynamicsTable.photos;
    existingFileUrl = StreetDynamicsTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'photos'}, {name: 'file_path'}
    ])
      .then(updateUserInfo)
      // .then(deleteOldImage)
      .then(function () {
        res.json(StreetDynamicsTable);
      })
      .catch(function (err) {
        logger.error('recv upload StreetDynamicsTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'StreetDynamicsTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (StreetDynamicsTable) {
        if (files && files.photos && files.photos.length === 1) {
          StreetDynamicsTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = StreetDynamicsTable.photos;
        }
        if (files && files.file_path && files.file_path.length === 1) {
          StreetDynamicsTable.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          newingImageUrl = StreetDynamicsTable.file_path;
        }
        StreetDynamicsTable.title = req.body.title;
        StreetDynamicsTable.content = req.body.content;
        StreetDynamicsTable.time = req.body.time;
        StreetDynamicsTable.ispush = req.body.ispush;

        //图片
        /*if (files && files.file_path && files.file_path.length === 1) {
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
         StreetDynamicsTable.file_path = distFileName1;
         StreetDynamicsTable.save().then(function () {
         return StreetDynamicsTable.reload()
         .then(function () {
         resolve();
         });
         }).catch(function (err) {
         reject(err);
         });
         });
         });
         });
         }*/
        // if (!(files && files.file_path && files.file_path.length === 1)) {
        StreetDynamicsTable.save().then(function () {
          return StreetDynamicsTable.reload()
            .then(function () {
              resolve();
            });
        }).catch(function (err) {
          reject(err);
        });
        // }
      } else {
        reject(new Error('no StreetDynamicsTable img upload'));
      }
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (existingImagejpg) {
        var oldjpg = existingImagejpg.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldjpg, function (unlinkError) {
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
 * Delete an StreetDynamicsTable
 */
exports.delete = function (req, res) {
  var StreetDynamicsTable = req.model;

  StreetDynamicsTable.destroy().then(function () {
    res.json(StreetDynamicsTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of StreetDynamicsTable
 */
exports.list = function (req, res) {
  var StreetDynamicsTable = sequelize.model('StreetDynamicsTable');

  StreetDynamicsTable.findAll({
    order: 'createdate DESC'
  }).then(function (StreetDynamicsTable) {
    return res.jsonp(StreetDynamicsTable);
  }).catch(function (err) {
    logger.error('StreetDynamicsTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * StreetDynamicsTable middleware
 */
exports.streetdynamicsinfoByID = function (req, res, next, id) {
  var StreetDynamicsTable = sequelize.model('StreetDynamicsTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    StreetDynamicsTable.findOne({
      where: {id: id}
    }).then(function (StreetDynamicsTable) {
      if (!StreetDynamicsTable) {
        logger.error('No StreetDynamicsTable with that identifier has been found');
        return res.status(404).send({
          message: 'No StreetDynamicsTable with that identifier has been found'
        });
      }

      req.model = StreetDynamicsTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('StreetDynamicsTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var StreetDynamicsTable = sequelize.model('StreetDynamicsTable');
  StreetDynamicsTable.findAll({
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
  var sql = 'select count(*) sum from StreetDynamicsTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
