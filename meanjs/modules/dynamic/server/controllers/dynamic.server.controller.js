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
//创建接收活动图片对象
var saveDir = 'dynamicPicfileimg';
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
 * Create an dynamic
 */
// exports.create = function (req, res) {
//   var dynamic = sequelize.model('KeyWorkTable');
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//   var KeyWorkTypeConstant = sequelize.model('KeyWorkTypeConstant');
//   var Dynamic = dynamic.build(req.body);
//   var newingImageUrl;
//   if (Dynamic) {
//     uploadImage.recv(req, res, [{name: 'photo'}])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(Dynamic);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'Dynamic is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (Dynamic) {
//         if (files && files.photo && files.photo.length === 1) {
//           Dynamic.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
//           newingImageUrl = Dynamic.photo;
//         }
//         Dynamic.title = req.body.title;
//         Dynamic.content = req.body.content;
//         Dynamic.partytype = req.body.partytype;
//         Dynamic.type = req.body.type;
//         Dynamic.typeId = req.body.typeId;
//         Dynamic.starttime = req.body.starttime;
//         Dynamic.endtime = req.body.endtime;
//         Dynamic.createdate = new Date();
//         Dynamic.departmentid = req.body.departmentid;
//         Dynamic.communityid = req.body.communityid;
//         Dynamic.head = req.body.head;
//         Dynamic.peoplenum = req.body.peoplenum;
//         Dynamic.phone = req.body.phone;
//         Dynamic.address = req.body.address;
//         //图片
//         Dynamic.save().then(function () {
//           return Dynamic.reload({
//             include: [
//               {
//                 model: CommunityVillageConstant,
//                 attributes: ['name']
//               },
//               {
//                 model: KeyWorkTypeConstant,
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
//         reject(new Error('no grid person img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current dynamic
 */
exports.read = function (req, res) {
  var dynamic = req.model ? req.model.toJSON() : {};
  dynamic.isCurrentUserOwner = !!(req.user && dynamic.user && dynamic.user.id.toString() === req.user.id.toString());
  res.json(dynamic);
};

/**
 * Update an dynamic
 */
exports.update = function (req, res) {
  var dynamic;
  var CommunityVillageConstant;
  var KeyWorkTypeConstant;
  var existingImageUrl;
  var newingImageUrl;
  var newingFileUrl;
  var existingFileUrl;
  var existingImagejpg;
  var Dynamic;
  if (req.model) {
    dynamic = req.model;
    CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
    KeyWorkTypeConstant = sequelize.model('KeyWorkTypeConstant');
  } else {
    dynamic = sequelize.model('KeyWorkTable');
    CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
    KeyWorkTypeConstant = sequelize.model('KeyWorkTypeConstant');
    dynamic = dynamic.build(req.body);
  }
  if (dynamic) {
    existingImageUrl = dynamic.photo;
    existingFileUrl = dynamic.file_path;
    uploadImage.recv(req, res, [{name: 'photo'}, {name: 'file_path'}])
      .then(updateUserInfo)
      //.then(deleteOldImage)
      .then(function () {
        res.json(dynamic);
      })
      .catch(function (err) {
        logger.error('recv upload dynamic picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'dynamic is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (dynamic) {
        if (files && files.photo && files.photo.length === 1) {
          dynamic.photo = path.join(uploadImage.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingImageUrl = dynamic.photo;
        }
        if (files && files.file_path && files.file_path.length === 1) {
          dynamic.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
          newingImageUrl = dynamic.file_path;
        }
        dynamic.title = req.body.title;
        dynamic.content = req.body.content;
        dynamic.type = req.body.type;
        dynamic.typeId = req.body.typeId;
        dynamic.partytype = req.body.partytype;
        dynamic.starttime = req.body.starttime;
        dynamic.endtime = req.body.endtime;
        dynamic.departmentid = req.body.departmentid;
        dynamic.communityid = req.body.communityid;
        dynamic.head = req.body.head;
        dynamic.peoplenum = req.body.peoplenum;
        dynamic.phone = req.body.phone;
        dynamic.address = req.body.address;
        dynamic.createdate = new Date();
        //图片
        /* if (files && files.file_path && files.file_path.length === 1) {
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
         dynamic.file_path = distFileName1;
         dynamic.save().then(function () {
         return dynamic.reload({
         include: [
         {
         model: CommunityVillageConstant,
         attributes: ['name']
         },
         {
         model: KeyWorkTypeConstant,
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
        dynamic.save().then(function () {
          return dynamic.reload({
            include: [
              {
                model: CommunityVillageConstant,
                attributes: ['name']
              },
              {
                model: KeyWorkTypeConstant,
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
        reject(new Error('no dynamic photo img upload'));
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

/**
 * Delete an dynamic
 */
exports.delete = function (req, res) {
  var dynamic = req.model;

  dynamic.destroy().then(function () {
    res.json(dynamic);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Dynamic
 */
exports.list = function (req, res) {
  var typeId = req.query.type;
  var type = req.query.typeId;
  var Dynamic = sequelize.model('KeyWorkTable');

  Dynamic.findAll({
    where: {
      type: typeId,
      typeId: type
    },
    order: 'createdate DESC'
  }).then(function (dynamic) {
    return res.jsonp(dynamic);
  }).catch(function (err) {
    logger.error('dynamic list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Dynamic middleware
 */
exports.dynamicByID = function (req, res, next, id) {
  var typeId = req.query.type;
  var Dynamic = sequelize.model('KeyWorkTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  var type = req.query.typeId1;
  var partytype = req.query.partytype;
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      // if (partytype) {
      listByPage_comm(req, res, limit, offset, typeId, parseInt(commId, 0), type, partytype);
      // } else {
      //   listByPage_comm(req, res, limit, offset, typeId, parseInt(commId, 0), type);
      // }
    } else {
      //if (partytype) {
      listByPage(req, res, limit, offset, typeId, type, partytype);
      // } else {
      //   listByPage(req, res, limit, offset, typeId, type);
      // }
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      // if (partytype) {
      listCount_comm(req, res, typeId, parseInt(commId, 0), type, partytype);
      // } else {
      //   listCount_comm(req, res, typeId, parseInt(commId, 0), type);
      // }

    } else {
      // if (partytype) {
      listCount(req, res, typeId, type, partytype);
      // } else {
      //   listCount(req, res, typeId, type);
      // }

    }
  } else if (id !== '0') {
    Dynamic.findOne({
      where: {keyworkid: id}
    }).then(function (dynamic) {
      if (!dynamic) {
        logger.error('No dynamic with that identifier has been found');
        return res.status(404).send({
          message: 'No dynamic with that identifier has been found'
        });
      }

      req.model = dynamic;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('dynamic ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};

//----分页
function listByPage(req, res, limit, offset, tj, type, partytype) {
  var Dynamic = sequelize.model('KeyWorkTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var KeyWorkTypeConstant = sequelize.model('KeyWorkTypeConstant');
  var where;
  if (partytype) {
    where = {
      type: {$like: '%' + tj + '%'},
      partytype: partytype,
      typeId: type
    };
  } else {
    where = {
      type: {$like: '%' + tj + '%'},
      typeId: type
    };
  }
  Dynamic.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      },
      {
        model: KeyWorkTypeConstant,
        attributes: ['name']
      }
    ],
    where: where,
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (KeyWorkTable) {
    return res.jsonp(KeyWorkTable);
  }).catch(function (err) {
    logger.error('KeyWorkTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, tj, type, partytype) {
  var sql;
  if (partytype) {
    sql = 'select count(*) sum from KeyWorkTable where type =\'' + tj + '\' and partytype = \'' + partytype + '\' and typeId = ' + type;
  } else {
    sql = 'select count(*) sum from KeyWorkTable where type =\'' + tj + '\' and typeId = ' + type;
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, tj, commId, type, partytype) {
  var Dynamic = sequelize.model('KeyWorkTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var KeyWorkTypeConstant = sequelize.model('KeyWorkTypeConstant');
  var where;
  if (partytype) {
    where = {
      type: {$like: '%' + tj + '%'},
      communityid: commId,
      partytype: partytype,
      typeId: type
    };
  } else {
    where = {
      type: {$like: '%' + tj + '%'},
      communityid: commId,
      typeId: type
    };
  }
  Dynamic.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      },
      {
        model: KeyWorkTypeConstant,
        attributes: ['name']
      }
    ],
    where: where,
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (KeyWorkTable) {
    return res.jsonp(KeyWorkTable);
  }).catch(function (err) {
    logger.error('KeyWorkTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, tj, commId, type, partytype) {
  var sql;
  if (partytype) {
    sql = 'select count(*) sum from KeyWorkTable ' +
      'where type =\'' + tj + '\' and communityid = ' + commId + ' and typeId = ' + type + ' and partytype = \'' + partytype + '\'';
  } else {
    sql = 'select count(*) sum from KeyWorkTable ' +
      'where type =\'' + tj + '\' and communityid = ' + commId + ' and typeId = ' + type;
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
