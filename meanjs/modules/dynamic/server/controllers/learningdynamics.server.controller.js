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
var saveDir = 'LearningDynamicsPicfileimg';
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
 * Create an LearningDynamicsTable
 */
// exports.create = function (req, res) {
//   var learningDynamicsTable = sequelize.model('LearningDynamicsTable');
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//   var LearningDynamicsTable = learningDynamicsTable.build(req.body);
//   var newingImageUrl;
//   if (LearningDynamicsTable) {
//     uploadImage.recv(req, res, [
//       {name: 'photos'}
//     ])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(LearningDynamicsTable);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'LearningDynamicsTable is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (LearningDynamicsTable) {
//         if (files && files.photos && files.photos.length === 1) {
//           LearningDynamicsTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
//           newingImageUrl = LearningDynamicsTable.photos;
//         }
//         LearningDynamicsTable.title = req.body.title;
//         LearningDynamicsTable.jurisdiction = req.body.jurisdiction;
//         LearningDynamicsTable.content = req.body.content;
//         LearningDynamicsTable.head = req.body.head;
//         LearningDynamicsTable.communityid = req.body.communityid;
//         LearningDynamicsTable.createdate = new Date();
//         //图片
//         LearningDynamicsTable.save().then(function () {
//           //重新加载数据，使数据含有关联表的内容
//           return LearningDynamicsTable.reload({
//             include: [
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
//         reject(new Error('no LearningDynamicsTable img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current LearningDynamicsTable
 */
exports.read = function (req, res) {
  var LearningDynamicsTable = req.model ? req.model.toJSON() : {};

  //LearningDynamicsTable.isCurrentUserOwner = !!(req.user && LearningDynamicsTable.user && LearningDynamicsTable.user._id.toString() === req.user._id.toString());
  LearningDynamicsTable.isCurrentUserOwner = !!(req.user && LearningDynamicsTable.user && LearningDynamicsTable.user.id.toString() === req.user.id.toString());

  res.json(LearningDynamicsTable);
};

/**
 * Update an LearningDynamicsTable
 */
exports.update = function (req, res) {
  var CommunityVillageConstant;
  var LearningDynamicsTable;
  var existingImageUrl;
  var existingFileUrl;
  var newingFileUrl;
  var existingImagejpg;
  var newingImageUrl;
  var learningDynamicsTable;
  if (req.model) {
    CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
    LearningDynamicsTable = req.model;
  } else {
    learningDynamicsTable = sequelize.model('LearningDynamicsTable');
    CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
    LearningDynamicsTable = learningDynamicsTable.build(req.body);
    LearningDynamicsTable.createdate = new Date();
  }
  if (LearningDynamicsTable) {
    existingImageUrl = LearningDynamicsTable.photos;
    existingFileUrl = LearningDynamicsTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'photos'}, {name: 'file_path'}
    ])
      .then(updateUserInfo)
      //.then(deleteOldImage)
      .then(function () {
        res.json(LearningDynamicsTable);
      })
      .catch(function (err) {
        logger.error('recv upload LearningDynamicsTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'LearningDynamicsTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (LearningDynamicsTable) {
        if (files && files.photos && files.photos.length === 1) {
          LearningDynamicsTable.photos = path.join(uploadImage.mountDir, files.photos[0].filename).replace(/\\/g, '/');
          newingImageUrl = LearningDynamicsTable.photos;
        }
        if (files && files.file_path && files.file_path.length === 1) {
          LearningDynamicsTable.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          newingImageUrl = LearningDynamicsTable.file_path;
        }
        LearningDynamicsTable.title = req.body.title;
        LearningDynamicsTable.jurisdiction = req.body.jurisdiction;
        LearningDynamicsTable.content = req.body.content;
        LearningDynamicsTable.head = req.body.head;
        LearningDynamicsTable.communityid = req.body.communityid;
        LearningDynamicsTable.party = req.body.party;
        //图片
        /*if (files && files.file_path && files.file_path.length === 1) {
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
         LearningDynamicsTable.file_path = distFileName1;
         LearningDynamicsTable.save().then(function () {
         return LearningDynamicsTable.reload({
         include: [
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
        // var distFile = path.basename(files.file_path[0].filename, path.extname(files.file_path[0].filename)) + '.' + distType;
        // var distFileName1 = path.join(uploadImage.mountDir, distFile).replace(/\\/g, '/');
        // LearningDynamicsTable.file_path = distFileName1;
        // if (!(files && files.file_path && files.file_path.length === 1)) {
        LearningDynamicsTable.save().then(function () {
          return LearningDynamicsTable.reload({
            include: [
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
        //}
      } else {
        reject(new Error('no YLC_activitiesTable img upload'));
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
      if (existingFileUrl && newingFileUrl && existingImageUrl && newingImageUrl) {
        var oldfilename1 = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
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
 * Delete an LearningDynamicsTable
 */
exports.delete = function (req, res) {
  var LearningDynamicsTable = req.model;

  LearningDynamicsTable.destroy().then(function () {
    res.json(LearningDynamicsTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of LearningDynamicsTable
 */
exports.list = function (req, res) {
  var LearningDynamicsTable = sequelize.model('LearningDynamicsTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  LearningDynamicsTable.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    order: 'createdate DESC'
  }).then(function (LearningDynamicsTable) {
    return res.jsonp(LearningDynamicsTable);
  }).catch(function (err) {
    logger.error('LearningDynamicsTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * LearningDynamicsTable middleware
 */
exports.learningdynamicsinfoByID = function (req, res, next, id) {
  var LearningDynamicsTable = sequelize.model('LearningDynamicsTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  var party = req.query.party;
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
  } else if (limit === 0 && offset === 0 && id === '0') {
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
    LearningDynamicsTable.findOne({
      where: {id: id}
    }).then(function (LearningDynamicsTable) {
      if (!LearningDynamicsTable) {
        logger.error('No LearningDynamicsTable with that identifier has been found');
        return res.status(404).send({
          message: 'No LearningDynamicsTable with that identifier has been found'
        });
      }

      req.model = LearningDynamicsTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('LearningDynamicsTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset, party) {
  var LearningDynamicsTable = sequelize.model('LearningDynamicsTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var where;
  if (party) {
    where = {
      where: {
        party: party
      },
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  } else {
    where = {
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  }
  LearningDynamicsTable.findAll(where).then(function (WomensFederationTypeTable) {
    return res.jsonp(WomensFederationTypeTable);
  }).catch(function (err) {
    logger.error('WomensFederationTypeTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from LearningDynamicsTable where party = ' + party;
  } else {
    sql = 'select count(*) sum from LearningDynamicsTable';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId, party) {
  var LearningDynamicsTable = sequelize.model('LearningDynamicsTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var where;
  if (party) {
    where = {
      communityid: commId,
      party: party
    };
  } else {
    where = {
      communityid: commId
    };
  }
  LearningDynamicsTable.findAll({
    where: where,
    include: [
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
function listCount_comm(req, res, commId, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from LearningDynamicsTable where communityid = ' + commId + ' and party = ' + party;
  } else {
    sql = 'select count(*) sum from LearningDynamicsTable where communityid = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
