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
var saveDir = 'ZYSPRZshuipin';
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
 * Create an ProfessionalGradingTable
 */
// exports.create = function (req, res) {
//   var professionalGradingTable = sequelize.model('ProfessionalGradingTable');
//   var ProfessionalGradingTable = professionalGradingTable.build(req.body);
//   ProfessionalGradingTable.createdate = new Date();
//
//   ProfessionalGradingTable.save().then(function () {
//     //重新加载数据，使数据含有关联表的内容
//     return ProfessionalGradingTable.reload()
//       .then(function () {
//         res.json(ProfessionalGradingTable);
//       });
//   }).catch(function (err) {
//     logger.error('ProfessionalGradingTable create error:', err);
//     return res.status(422).send({
//       message: errorHandler.getErrorMessage(err)
//     });
//   });
// };

/**
 * Show the current ProfessionalGradingTable
 */
exports.read = function (req, res) {
  var ProfessionalGradingTable = req.model ? req.model.toJSON() : {};

  //ProfessionalGradingTable.isCurrentUserOwner = !!(req.user && ProfessionalGradingTable.user && ProfessionalGradingTable.user._id.toString() === req.user._id.toString());
  ProfessionalGradingTable.isCurrentUserOwner = !!(req.user && ProfessionalGradingTable.user && ProfessionalGradingTable.user.id.toString() === req.user.id.toString());

  res.json(ProfessionalGradingTable);
};

/**
 * Update an ProfessionalGradingTable
 */
// exports.update = function (req, res) {
//   var ProfessionalGradingTable = req.model;
//
//   ProfessionalGradingTable.title = req.body.title;
//   ProfessionalGradingTable.content = req.body.content;
//   ProfessionalGradingTable.jurisdiction = req.body.jurisdiction;
//   ProfessionalGradingTable.head = req.body.head;
//   ProfessionalGradingTable.save().then(function () {
//     res.json(ProfessionalGradingTable);
//   }).catch(function (err) {
//     return res.status(422).send({
//       message: errorHandler.getErrorMessage(err)
//     });
//   });
// };
exports.update = function (req, res) {
  var professionalGradingTable = sequelize.model('ProfessionalGradingTable');
  var ProfessionalGradingTable = professionalGradingTable.build(req.body);
  var existingFileUrl;
  var newingFileUrl;
  var existingImagejpg;
  if (req.model) {
    ProfessionalGradingTable = req.model;
  } else {
    ProfessionalGradingTable = professionalGradingTable.build(req.body);
    ProfessionalGradingTable.createdate = new Date();
  }
  if (ProfessionalGradingTable) {
    existingFileUrl = ProfessionalGradingTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'file_path'}
    ])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(ProfessionalGradingTable);
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
      if (ProfessionalGradingTable) {
        ProfessionalGradingTable.title = req.body.title;
        ProfessionalGradingTable.content = req.body.content;
        ProfessionalGradingTable.jurisdiction = req.body.jurisdiction;
        ProfessionalGradingTable.head = req.body.head;
        ProfessionalGradingTable.party = req.body.party;
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
                ProfessionalGradingTable.file_path = distFileName1;
                ProfessionalGradingTable.save().then(function () {
                  resolve();
                }).catch(function (err) {
                  reject(err);
                });
              });
            });
          });
        }
        // var distFile = path.basename(files.file_path[0].filename, path.extname(files.file_path[0].filename)) + '.' + distType;
        // var distFileName1 = path.join(uploadImage.mountDir, distFile).replace(/\\/g, '/');
        // LearningDynamicsTable.file_path = distFileName1;
        if (!(files && files.file_path && files.file_path.length === 1)) {
          ProfessionalGradingTable.save().then(function () {
            resolve();
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
 * Delete an ProfessionalGradingTable
 */
exports.delete = function (req, res) {
  var ProfessionalGradingTable = req.model;

  ProfessionalGradingTable.destroy().then(function () {
    res.json(ProfessionalGradingTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of ProfessionalGradingTable
 */
exports.list = function (req, res) {
  var ProfessionalGradingTable = sequelize.model('ProfessionalGradingTable');

  ProfessionalGradingTable.findAll({
    order: 'createdate DESC'
  }).then(function (ProfessionalGradingTable) {
    return res.jsonp(ProfessionalGradingTable);
  }).catch(function (err) {
    logger.error('ProfessionalGradingTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * ProfessionalGradingTable middleware
 */
exports.professionalgradinginfoByID = function (req, res, next, id) {
  var ProfessionalGradingTable = sequelize.model('ProfessionalGradingTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var party = req.query.party;
  if (offset !== 0 && id === '0') {
    if (party) {
      listByPage(req, res, limit, offset, party);
    } else {
      listByPage(req, res, limit, offset);
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (party) {
      listCount(req, res, party);
    } else {
      listCount(req, res);
    }
  } else if (id !== '0') {
    ProfessionalGradingTable.findOne({
      where: {id: id}
    }).then(function (ProfessionalGradingTable) {
      if (!ProfessionalGradingTable) {
        logger.error('No ProfessionalGradingTable with that identifier has been found');
        return res.status(404).send({
          message: 'No ProfessionalGradingTable with that identifier has been found'
        });
      }

      req.model = ProfessionalGradingTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('ProfessionalGradingTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset, party) {
  var ProfessionalGradingTable = sequelize.model('ProfessionalGradingTable');
  var where;
  if (party) {
    where = {
      where: {
        party: party
      },
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  } else {
    where = {
      limit: [limit, offset],
      order: 'createdate DESC'
    };
  }
  ProfessionalGradingTable.findAll(where).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('ProfessionalGradingTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from ProfessionalGradingTable where party = ' + party;
  } else {
    sql = 'select count(*) sum from ProfessionalGradingTable';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
