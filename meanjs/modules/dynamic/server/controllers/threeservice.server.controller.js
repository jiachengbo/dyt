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
var saveDir = 'ThreeServicePicfileimg';
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
 * Create an ThreeServiceTable
 */
// exports.create = function (req, res) {
//   var threeServiceTable = sequelize.model('ThreeServiceTable');
//   var ThreeServiceTypeTable = sequelize.model('ThreeServiceTypeTable');
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//   var ThreeServiceTable = threeServiceTable.build(req.body);
//   var newingImageUrl;
//   if (ThreeServiceTable) {
//     uploadImage.recv(req, res, [
//       {name: 'photos'}
//     ])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(ThreeServiceTable);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'ThreeServiceTable is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (ThreeServiceTable) {
//         if (files && files.photos && files.photos.length === 1) {
//           ThreeServiceTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
//           newingImageUrl = ThreeServiceTable.photos;
//         }
//         ThreeServiceTable.title = req.body.title;
//         ThreeServiceTable.jurisdiction = req.body.jurisdiction;
//         ThreeServiceTable.content = req.body.content;
//         ThreeServiceTable.type = req.body.type;
//         ThreeServiceTable.head = req.body.head;
//         ThreeServiceTable.communityid = req.body.communityid;
//         ThreeServiceTable.createdate = new Date();
//         //图片
//         ThreeServiceTable.save().then(function () {
//           //重新加载数据，使数据含有关联表的内容
//           return ThreeServiceTable.reload({
//             include: [
//               {
//                 model: ThreeServiceTypeTable,
//                 attributes: ['name']
//               },
//               {
//                 model: CommunityVillageConstant,
//                 attributes: ['name']
//               }
//             ]
//           })
//             .then(function () {
//               resolve();
//             });
//         }).catch(function (err) {
//           reject(err);
//         });
//       } else {
//         reject(new Error('no ThreeServiceTable img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current ThreeServiceTable
 */
exports.read = function (req, res) {
  var ThreeServiceTable = req.model ? req.model.toJSON() : {};

  //ThreeServiceTable.isCurrentUserOwner = !!(req.user && ThreeServiceTable.user && ThreeServiceTable.user._id.toString() === req.user._id.toString());
  ThreeServiceTable.isCurrentUserOwner = !!(req.user && ThreeServiceTable.user && ThreeServiceTable.user.id.toString() === req.user.id.toString());

  res.json(ThreeServiceTable);
};

/**
 * Update an ThreeServiceTable
 */
exports.update = function (req, res) {
  var ThreeServiceTypeTable = sequelize.model('ThreeServiceTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var ThreeServiceTable = req.model;
  var threeServiceTable;
  var existingImageUrl;
  var existingFileUrl;
  var existingImagejpg;
  var newingFileUrl;
  var newingImageUrl;
  if (req.model) {
    ThreeServiceTable = req.model;
  } else {
    threeServiceTable = sequelize.model('ThreeServiceTable');
    ThreeServiceTable = threeServiceTable.build(req.body);
    ThreeServiceTable.createdate = new Date();
  }
  if (ThreeServiceTable) {
    existingImageUrl = ThreeServiceTable.photos;
    existingFileUrl = ThreeServiceTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'photos'}, {name: 'file_path'}
    ])
      .then(updateUserInfo)
      //.then(deleteOldImage)
      .then(function () {
        res.json(ThreeServiceTable);
      })
      .catch(function (err) {
        logger.error('recv upload ThreeServiceTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'ThreeServiceTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (ThreeServiceTable) {
        if (files && files.photos && files.photos.length === 1) {
          ThreeServiceTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = ThreeServiceTable.photos;
        }
        if (files && files.file_path && files.file_path.length === 1) {
          ThreeServiceTable.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
        }
        ThreeServiceTable.title = req.body.title;
        ThreeServiceTable.jurisdiction = req.body.jurisdiction;
        ThreeServiceTable.content = req.body.content;
        ThreeServiceTable.type = req.body.type;
        ThreeServiceTable.head = req.body.head;
        ThreeServiceTable.communityid = req.body.communityid;
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
         ThreeServiceTable.file_path = distFileName1;
         ThreeServiceTable.save().then(function () {
         return ThreeServiceTable.reload({
         include: [
         {
         model: ThreeServiceTypeTable,
         attributes: ['name']
         },
         {
         model: CommunityVillageConstant,
         attributes: ['name']
         }
         ]
         })
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
        //if (!(files && files.file_path && files.file_path.length === 1)) {
        ThreeServiceTable.save().then(function () {
          return ThreeServiceTable.reload({
            include: [
              {
                model: ThreeServiceTypeTable,
                attributes: ['name']
              },
              {
                model: CommunityVillageConstant,
                attributes: ['name']
              }
            ]
          })
            .then(function () {
              resolve();
            });
        }).catch(function (err) {
          reject(err);
        });
        // }
      } else {
        reject(new Error('no ThreeServiceTable img upload'));
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
        var oldfilename1 = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfilename1, function (unlinkError) {
          if (unlinkError) {
            reject({message: '文件删除错误'});
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
      if (existingFileUrl && newingFileUrl && existingImageUrl && newingImageUrl) {
        var oldfilename2 = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfilename2, function (unlikError) {
          if (unlikError) {
            reject({message: '文件删除错误'});
          }
        });
        var oldfilename3 = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfilename3, function (unlinkError) {
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
 * Delete an ThreeServiceTable
 */
exports.delete = function (req, res) {
  var ThreeServiceTable = req.model;

  ThreeServiceTable.destroy().then(function () {
    res.json(ThreeServiceTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of ThreeServiceTable
 */
exports.list = function (req, res) {
  var ThreeServiceTable = sequelize.model('ThreeServiceTable');

  ThreeServiceTable.findAll({
    order: 'createdate DESC'
  }).then(function (ThreeServiceTable) {
    return res.jsonp(ThreeServiceTable);
  }).catch(function (err) {
    logger.error('ThreeServiceTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * ThreeServiceTable middleware
 */
exports.threeserviceinfoByID = function (req, res, next, id) {
  var ThreeServiceTable = sequelize.model('ThreeServiceTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
    } else {
      listByPage(req, res, limit, offset);
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      listCount_comm(req, res, parseInt(commId, 0));
    } else {
      listCount(req, res);
    }
  } else if (id !== '0') {
    ThreeServiceTable.findOne({
      where: {id: id}
    }).then(function (ThreeServiceTable) {
      if (!ThreeServiceTable) {
        logger.error('No ThreeServiceTable with that identifier has been found');
        return res.status(404).send({
          message: 'No ThreeServiceTable with that identifier has been found'
        });
      }

      req.model = ThreeServiceTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('ThreeServiceTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var ThreeServiceTable = sequelize.model('ThreeServiceTable');
  var ThreeServiceTypeTable = sequelize.model('ThreeServiceTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  ThreeServiceTable.findAll({
    include: [
      {
        model: ThreeServiceTypeTable,
        attributes: ['name']
      },
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (WomensFederationTypeTable) {
    return res.jsonp(WomensFederationTypeTable);
  }).catch(function (err) {
    logger.error('WomensFederationTypeTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from ThreeServiceTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId) {
  var ThreeServiceTable = sequelize.model('ThreeServiceTable');
  var ThreeServiceTypeTable = sequelize.model('ThreeServiceTypeTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  ThreeServiceTable.findAll({
    where: {communityid: commId},
    include: [
      {
        model: ThreeServiceTypeTable,
        attributes: ['name']
      },
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (WomensFederationTypeTable) {
    return res.jsonp(WomensFederationTypeTable);
  }).catch(function (err) {
    logger.error('WomensFederationTypeTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId) {
  var sql = 'select count(*) sum from ThreeServiceTable where communityid = ' + commId + '';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
