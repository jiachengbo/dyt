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
//创建接收图片的对象
var saveDir = 'djdynamicPicfileimg';
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
 * Create an DynamicTable
 */
// exports.create = function (req, res) {
//   var dynamicTable = sequelize.model('DynamicTable');
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//   var GridTable = sequelize.model('GridTable');
//   var DynamicTable = dynamicTable.build(req.body);
//   var newingImageUrl;
//   if (DynamicTable) {
//     uploadImage.recv(req, res, [
//       {name: 'photoone'},
//       {name: 'phototwo'},
//       {name: 'photothree'}
//     ])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(DynamicTable);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'DynamicTable is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (DynamicTable) {
//         if (files && files.photoone && files.photoone.length === 1) {
//           DynamicTable.photoone = path.join(uploadImage.mountDir, files.photoone[0].filename).replace(/\\/g, '/');
//           newingImageUrl = DynamicTable.photoone;
//         }
//         if (files && files.phototwo && files.phototwo.length === 1) {
//           DynamicTable.phototwo = path.join(uploadImage.mountDir, files.phototwo[0].filename).replace(/\\/g, '/');
//           newingImageUrl = DynamicTable.phototwo;
//         }
//         if (files && files.photothree && files.photothree.length === 1) {
//           DynamicTable.photothree = path.join(uploadImage.mountDir, files.photothree[0].filename).replace(/\\/g, '/');
//           newingImageUrl = DynamicTable.photothree;
//         }
//         DynamicTable.dynamictitle = req.body.dynamictitle;
//         DynamicTable.dynamiccontext = req.body.dynamiccontext;
//         DynamicTable.state = req.body.state;
//         DynamicTable.communityid = req.body.communityid;
//         DynamicTable.gridid = req.body.gridid;
//         DynamicTable.type = req.body.type;
//         DynamicTable.createdate = new Date();
//         //图片
//         DynamicTable.save().then(function () {
//           //重新加载数据，使数据含有关联表的内容
//           return DynamicTable.reload({
//             include: [
//               {
//                 model: CommunityVillageConstant,
//                 attributes: ['name']
//               },
//               {
//                 model: GridTable,
//                 attributes: ['name']
//               }
//             ],
//             order: 'createdate ASC'
//           })
//             .then(function () {
//               resolve();
//             });
//         }).catch(function (err) {
//           reject(err);
//         });
//       } else {
//         reject(new Error('no DynamicTable img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current DynamicTable
 */
exports.read = function (req, res) {
  var DynamicTable = req.model ? req.model.toJSON() : {};
  DynamicTable.isCurrentUserOwner = !!(req.user && DynamicTable.user && DynamicTable.user.id.toString() === req.user.id.toString());
  res.json(DynamicTable);
};

/**
 * Update an DynamicTable
 */
exports.update = function (req, res) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var GridTable = sequelize.model('GridTable');
  var DynamicTable = req.model;
  var dynamicTable;
  var existingImageUrl;
  var existingFileUrl;
  var newingImageUrl;
  var newingFileUrl;
  var existingImagejpg;
  if (req.model) {
    DynamicTable = req.model;
  } else {
    dynamicTable = sequelize.model('DynamicTable');
    DynamicTable = dynamicTable.build(req.body);
    DynamicTable.createdate = new Date();
  }
  if (DynamicTable) {
    existingImageUrl = DynamicTable.photo;
    existingFileUrl = DynamicTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'photoone'},
      {name: 'phototwo'},
      {name: 'photothree'},
      {name: 'file_path'}
    ])
      .then(updateUserInfo)
      // .then(deleteOldImage)
      .then(function () {
        res.json(DynamicTable);
      })
      .catch(function (err) {
        logger.error('recv upload DynamicTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'DynamicTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (DynamicTable) {
        if (files && files.photoone && files.photoone.length === 1) {
          DynamicTable.photoone = path.join(uploadImage.mountDir, files.photoone[0].filename).replace(/\\/g, '/');
          newingImageUrl = DynamicTable.photoone;
        }
        if (files && files.phototwo && files.phototwo.length === 1) {
          DynamicTable.phototwo = path.join(uploadImage.mountDir, files.phototwo[0].filename).replace(/\\/g, '/');
          newingImageUrl = DynamicTable.phototwo;
        }
        if (files && files.photothree && files.photothree.length === 1) {
          DynamicTable.photothree = path.join(uploadImage.mountDir, files.photothree[0].filename).replace(/\\/g, '/');
          newingImageUrl = DynamicTable.photothree;
        }
        if (files && files.file_path && files.file_path.length === 1) {
          DynamicTable.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          DynamicTable.file_path = DynamicTable.file_path;
          newingImageUrl = DynamicTable.file_path;
        }
        DynamicTable.dynamictitle = req.body.dynamictitle;
        DynamicTable.dynamiccontext = req.body.dynamiccontext;
        DynamicTable.state = req.body.state;
        DynamicTable.communityid = req.body.communityid;
        DynamicTable.gridid = req.body.gridid;
        DynamicTable.type = req.body.type;
        //图片
        // if (files && files.file_path && files.file_path.length === 1) {
        //   existingImagejpg = path.join(mountDir1, files.file_path[0].filename).replace(/\\/g, '/');
        //   // newingFileUrl = womenInformationManagement.file_path;
        //   //  转HTML
        //   var diskFileName = path.join(diskDir1, files.file_path[0].filename);
        //   fs.exists(diskFileName, function (exists) {
        //     if (!exists) {
        //       logger.warn('conv docfile %s not exists', diskFileName);
        //       return res.status(404).send('参数文件不存在:' + diskFileName);
        //     }
        //
        //     var type = distType + (typeParam[distType] ? typeParam[distType] : '');
        //     var cmdLine = util.format('"%s" --headless --convert-to "%s"  --outdir "%s" "%s"',
        //       config.sofficePathName, type, diskDir1, diskFileName);
        //
        //     child_process.exec(cmdLine, function (error, stdout, stderr) {
        //       if (error) {
        //         logger.warn('conv docfile %s to pdf error:', diskFileName, error.message);
        //         return res.status(404).send('文件转换错误:' + diskFileName);
        //       }
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
        //         DynamicTable.file_path = distFileName1;
        //         DynamicTable.save().then(function () {
        //           return DynamicTable.reload({
        //             include: [
        //               {
        //                 model: CommunityVillageConstant,
        //                 attributes: ['name']
        //               },
        //               {
        //                 model: GridTable,
        //                 attributes: ['name']
        //               }
        //             ],
        //             order: 'createdate ASC'
        //           })
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
        // var distFile = path.basename(files.file_path[0].filename, path.extname(files.file_path[0].filename)) + '.' + distType;
        // var distFileName1 = path.join(uploadImage.mountDir, distFile).replace(/\\/g, '/');
        // LearningDynamicsTable.file_path = distFileName1;
        //if (!(files && files.file_path && files.file_path.length === 1)) {
        DynamicTable.save().then(function () {
          return DynamicTable.reload({
            include: [
              {
                model: CommunityVillageConstant,
                attributes: ['name']
              },
              {
                model: GridTable,
                attributes: ['name']
              }
            ],
            order: 'createdate ASC'
          })
            .then(function () {
              resolve();
            });
        }).catch(function (err) {
          reject(err);
        });
        //}
      } else {
        reject(new Error('no DynamicTable img upload'));
      }
    });
  }

  // function deleteOldImage() {
  //     return new Promise(function (resolve, reject) {
  //         if (existingImagejpg) {
  //             var oldImageName = existingImagejpg.replace(uploadImage.mountDir, uploadImage.diskDir);
  //             fs.unlink(oldImageName, function (unlinkError) {
  //             });
  //         }
  //         if (existingImageUrl && newingImageUrl) {
  //             var oldfilename = existingImageUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
  //             fs.unlink(oldfilename, function (unlinkError) {
  //                 if (unlinkError) {
  //                     resolve();
  //                     /* reject({
  //                      message: 'Error while deleting old picture'
  //                      });*/
  //                 } else {
  //                     resolve();
  //                 }
  //             });
  //         } else {
  //             resolve();
  //         }
  //         if (existingFileUrl && newingFileUrl) {
  //             var oldfile = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
  //             fs.unlink(oldfile, function (unlinkError) {
  //                 if (unlinkError) {
  //                     resolve();
  //                 } else {
  //                     resolve();
  //                 }
  //             });
  //         } else {
  //             resolve();
  //         }
  //     });
  // }
};

/**
 * Delete an DynamicTable
 */
exports.delete = function (req, res) {
  var DynamicTable = req.model;

  DynamicTable.destroy().then(function () {
    res.json(DynamicTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of DynamicTable
 */
exports.list = function (req, res) {
  var DynamicTable = sequelize.model('DynamicTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var GridTable = sequelize.model('GridTable');

  DynamicTable.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      },
      {
        model: GridTable,
        attributes: ['name']
      }
    ],
    order: 'createdate ASC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('DynamicTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * DynamicTable middleware
 */
exports.djdynamicByID = function (req, res, next, id) {
  var DynamicTable = sequelize.model('DynamicTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  var type = req.query.type;
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      if (type) {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0), type);
      } else {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
      }

    } else {
      if (type) {
        listByPage(req, res, limit, offset, type);
      } else {
        listByPage(req, res, limit, offset);
      }
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      listCount_comm(req, res, parseInt(commId, 0));
    } else {
      if (type) {
        listCount(req, res, type);
      } else {
        listCount(req, res);
      }
    }
  } else if (id !== '0') {
    DynamicTable.findOne({
      where: {dynamicid: id}
    }).then(function (DynamicTable) {
      if (!DynamicTable) {
        logger.error('No DynamicTable with that identifier has been found');
        return res.status(404).send({
          message: 'No DynamicTable with that identifier has been found'
        });
      }
      req.model = DynamicTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('DynamicTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};

//----分页
function listByPage(req, res, limit, offset, type) {
  var DynamicTable = sequelize.model('DynamicTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var GridTable = sequelize.model('GridTable');
  var where;
  if (type) {
    where = {
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        },
        {
          model: GridTable,
          attributes: ['name']
        }
      ],
      where: {
        type: type
      },
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  } else {
    where = {
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        },
        {
          model: GridTable,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  }
  DynamicTable.findAll(where).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('DynamicTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, type) {
  var sql;
  if (type) {
    sql = 'select count(*) sum from DynamicTable where type = \'' + type + '\'';
  } else {
    sql = 'select count(*) sum from DynamicTable';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId, type) {
  var DynamicTable = sequelize.model('DynamicTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var GridTable = sequelize.model('GridTable');
  var where;
  if (type) {
    where = {
      communityid: commId,
      type: type
    };
  } else {
    where = {communityid: commId};
  }
  DynamicTable.findAll({
    where: where,
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      },
      {
        model: GridTable,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('DynamicTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId, type) {
  var sql;
  if (type) {
    sql = 'select count(*) sum from DynamicTable where communityid = ' + commId + ' and type = \'' + type + '\'';
  } else {
    sql = 'select count(*) sum from DynamicTable where communityid = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
