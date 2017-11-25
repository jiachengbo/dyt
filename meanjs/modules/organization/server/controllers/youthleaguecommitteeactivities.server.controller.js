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

var saveDir = 'ylcaPicfileimg';
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
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();
/**
 * Create an YLC_activitiesTable
 */
// exports.create = function (req, res) {
//   var YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');
//   var ylc_activitiesTable = sequelize.model('YLC_activitiesTable');
//   var YLC_activitiesTable = ylc_activitiesTable.build(req.body);
//   var newingImageUrl;
//   if (YLC_activitiesTable) {
//     uploadImage.recv(req, res, [
//       {name: 'activitiespic'}
//     ])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(YLC_activitiesTable);
//       })
//       .catch(function (err) {
//         logger.error('上传照片失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'YLC_activitiesTable is not exist'
//     });
//   }
//
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (YLC_activitiesTable) {
//         if (files && files.activitiespic && files.activitiespic.length === 1) {
//           YLC_activitiesTable.activitiespic = path.join(uploadImage.mountDir, files.activitiespic[0].filename).replace(/\\/g, '/');
//           newingImageUrl = YLC_activitiesTable.activitiespic;
//         }
//         YLC_activitiesTable.activitiesname = req.body.activitiesname;
//         YLC_activitiesTable.activitiestype = req.body.activitiestype;
//         YLC_activitiesTable.activitiescontent = req.body.activitiescontent;
//         YLC_activitiesTable.activitiestime = req.body.activitiestime;
//         YLC_activitiesTable.createdate = new Date();
//         //图片
//         YLC_activitiesTable.save().then(function () {
//           //重新加载数据，使数据含有关联表的内容
//           return YLC_activitiesTable.reload({
//             include: [
//               {
//                 model: YLC_activitiesTypeTable,
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
//         reject(new Error('no YLC_activitiesTable img upload'));
//       }
//     });
//   }
// };

/**
 * Show the current YLC_activitiesTable
 */
exports.read = function (req, res) {
  var YLC_activitiesTable = req.model ? req.model.toJSON() : {};

  //YLC_activitiesTable.isCurrentUserOwner = !!(req.user && YLC_activitiesTable.user && YLC_activitiesTable.user._id.toString() === req.user._id.toString());
  YLC_activitiesTable.isCurrentUserOwner = !!(req.user && YLC_activitiesTable.user && YLC_activitiesTable.user.id.toString() === req.user.id.toString());

  res.json(YLC_activitiesTable);
};

/**
 * Update an YLC_activitiesTable
 */
exports.update = function (req, res) {
  var YLC_activitiesTable;
  var YLC_activitiesTypeTable;
  var existingImageUrl;
  var newingImageUrl;
  var newingFileUrl;
  var existingFileUrl;
  var existingImagejpg;
  var ylc_activitiesTable;
  if (req.model) {
    YLC_activitiesTable = req.model;
    YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');
  } else {
    YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');
    ylc_activitiesTable = sequelize.model('YLC_activitiesTable');
    YLC_activitiesTable = ylc_activitiesTable.build(req.body);
    YLC_activitiesTable.createdate = new Date();
  }
  if (YLC_activitiesTable) {
    existingImageUrl = YLC_activitiesTable.activitiespic;
    existingFileUrl = YLC_activitiesTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'activitiespic'}, {name: 'file_path'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(YLC_activitiesTable);
      })
      .catch(function (err) {
        logger.error('recv upload YLC_activitiesTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'YLC_activitiesTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (YLC_activitiesTable) {
        if (files && files.activitiespic && files.activitiespic.length === 1) {
          YLC_activitiesTable.activitiespic = path.join(uploadImage.mountDir, files.activitiespic[0].filename).replace(/\\/g, '/');
          newingImageUrl = YLC_activitiesTable.activitiespic;
        }
        YLC_activitiesTable.activitiesname = req.body.activitiesname;
        YLC_activitiesTable.activitiestype = req.body.activitiestype;
        YLC_activitiesTable.activitiescontent = req.body.activitiescontent;
        YLC_activitiesTable.activitiestime = req.body.activitiestime;

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
                YLC_activitiesTable.file_path = distFileName1;
                YLC_activitiesTable.save().then(function () {
                  return YLC_activitiesTable.reload({
                    include: [
                      {
                        model: YLC_activitiesTypeTable,
                        attributes: ['name']
                      }]
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
        }
        if (!(files && files.file_path && files.file_path.length === 1)) {
          YLC_activitiesTable.save().then(function () {
            return YLC_activitiesTable.reload({
              include: [
                {
                  model: YLC_activitiesTypeTable,
                  attributes: ['name']
                }]
            })
              .then(function () {
                resolve();
              });
          }).catch(function (err) {
            reject(err);
          });
        }
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
        console.log(oldfilename1);
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
 * Delete an YLC_activitiesTable
 */
exports.delete = function (req, res) {
  var YLC_activitiesTable = req.model;

  YLC_activitiesTable.destroy().then(function () {
    res.json(YLC_activitiesTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of YLC_activitiesTable
 */
exports.list = function (req, res) {
  var YLC_activitiesTable = sequelize.model('YLC_activitiesTable');
  var YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');

  YLC_activitiesTable.findAll({
    include: [
      {
        model: YLC_activitiesTypeTable,
        attributes: ['name']
      }
    ],
    order: 'createdate DESC'
  }).then(function (YLC_activitiesTable) {
    return res.jsonp(YLC_activitiesTable);
  }).catch(function (err) {
    logger.error('YLC_activitiesTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * YLC_activitiesTable middleware
 */
exports.ylcaByID = function (req, res, next, id) {
  var YLC_activitiesTable = sequelize.model('YLC_activitiesTable');
  var YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    YLC_activitiesTable.findOne({
      where: {id: id},
      include: [
        {
          model: YLC_activitiesTypeTable,
          attributes: ['name']
        }
      ]
    }).then(function (YLC_activitiesTable) {
      if (!YLC_activitiesTable) {
        logger.error('No YLC_activitiesTable with that identifier has been found');
        return res.status(404).send({
          message: 'No YLC_activitiesTable with that identifier has been found'
        });
      }

      req.model = YLC_activitiesTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('YLC_activitiesTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var YLC_activitiesTable = sequelize.model('YLC_activitiesTable');
  var YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');
  YLC_activitiesTable.findAll({
    include: [
      {
        model: YLC_activitiesTypeTable,
        attributes: ['name']
      }
    ],
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
  var sql = 'select count(*) sum from YLC_activitiesTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
