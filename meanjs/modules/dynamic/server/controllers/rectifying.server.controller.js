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
var saveDir = 'DZZZDparty';
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
 * Create an PartyOrganizationReorganizationTable
 */
// exports.create = function (req, res) {
//   var partyOrganizationReorganizationTable = sequelize.model('PartyOrganizationReorganizationTable');
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//   var PartyOrganizationReorganizationTable = partyOrganizationReorganizationTable.build(req.body);
//   PartyOrganizationReorganizationTable.createdate = new Date();
//
//   PartyOrganizationReorganizationTable.save().then(function () {
//     //重新加载数据，使数据含有关联表的内容
//     return PartyOrganizationReorganizationTable.reload({
//       include: [
//         {
//           model: CommunityVillageConstant,
//           attributes: ['name']
//         }
//       ]
//     })
//       .then(function () {
//         res.json(PartyOrganizationReorganizationTable);
//       });
//   }).catch(function (err) {
//     logger.error('PartyOrganizationReorganizationTable create error:', err);
//     return res.status(422).send({
//       message: errorHandler.getErrorMessage(err)
//     });
//   });
// };

/**
 * Show the current PartyOrganizationReorganizationTable
 */
exports.read = function (req, res) {
  var PartyOrganizationReorganizationTable = req.model ? req.model.toJSON() : {};

  //PartyOrganizationReorganizationTable.isCurrentUserOwner = !!(req.user && PartyOrganizationReorganizationTable.user && PartyOrganizationReorganizationTable.user._id.toString() === req.user._id.toString());
  PartyOrganizationReorganizationTable.isCurrentUserOwner = !!(req.user && PartyOrganizationReorganizationTable.user && PartyOrganizationReorganizationTable.user.id.toString() === req.user.id.toString());

  res.json(PartyOrganizationReorganizationTable);
};

/**
 * Update an PartyOrganizationReorganizationTable
 */
// exports.update = function (req, res) {
//   var PartyOrganizationReorganizationTable = req.model;
//   var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
//
//   PartyOrganizationReorganizationTable.name = req.body.name;
//   PartyOrganizationReorganizationTable.peoplenum = req.body.peoplenum;
//   PartyOrganizationReorganizationTable.head = req.body.head;
//   PartyOrganizationReorganizationTable.tel = req.body.tel;
//   PartyOrganizationReorganizationTable.mainproblem = req.body.mainproblem;
//   PartyOrganizationReorganizationTable.Measures = req.body.Measures;
//   PartyOrganizationReorganizationTable.communityid = req.body.communityid;
//   PartyOrganizationReorganizationTable.save().then(function () {
//     return PartyOrganizationReorganizationTable.reload({
//       include: [
//         {
//           model: CommunityVillageConstant,
//           attributes: ['name']
//         }
//       ]
//     })
//       .then(function () {
//         res.json(PartyOrganizationReorganizationTable);
//       });
//   }).catch(function (err) {
//     return res.status(422).send({
//       message: errorHandler.getErrorMessage(err)
//     });
//   });
// };
exports.update = function (req, res) {
  var partyOrganizationReorganizationTable = sequelize.model('PartyOrganizationReorganizationTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var PartyOrganizationReorganizationTable;
  var existingFileUrl;
  var newingFileUrl;
  var existingImagejpg;
  if (req.model) {
    PartyOrganizationReorganizationTable = req.model;
  } else {
    PartyOrganizationReorganizationTable = partyOrganizationReorganizationTable.build(req.body);
    PartyOrganizationReorganizationTable.createdate = new Date();
  }
  if (PartyOrganizationReorganizationTable) {
    existingFileUrl = PartyOrganizationReorganizationTable.file_path;
    uploadImage.recv(req, res, [
      {name: 'file_path'}
    ])
      .then(updateUserInfo)
      // .then(deleteOldImage)
      .then(function () {
        res.json(PartyOrganizationReorganizationTable);
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
      if (PartyOrganizationReorganizationTable) {
        if (files && files.file_path && files.file_path.length === 1) {
          PartyOrganizationReorganizationTable.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
        }
        PartyOrganizationReorganizationTable.name = req.body.name;
        PartyOrganizationReorganizationTable.peoplenum = req.body.peoplenum;
        PartyOrganizationReorganizationTable.head = req.body.head;
        PartyOrganizationReorganizationTable.tel = req.body.tel;
        PartyOrganizationReorganizationTable.mainproblem = req.body.mainproblem;
        PartyOrganizationReorganizationTable.Measures = req.body.Measures;
        PartyOrganizationReorganizationTable.communityid = req.body.communityid;
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
         PartyOrganizationReorganizationTable.file_path = distFileName1;
         PartyOrganizationReorganizationTable.save().then(function () {
         return PartyOrganizationReorganizationTable.reload({
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
        PartyOrganizationReorganizationTable.save().then(function () {
          return PartyOrganizationReorganizationTable.reload({
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
 * Delete an PartyOrganizationReorganizationTable
 */
exports.delete = function (req, res) {
  var PartyOrganizationReorganizationTable = req.model;

  PartyOrganizationReorganizationTable.destroy().then(function () {
    res.json(PartyOrganizationReorganizationTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of PartyOrganizationReorganizationTable
 */
exports.list = function (req, res) {
  var PartyOrganizationReorganizationTable = sequelize.model('PartyOrganizationReorganizationTable');

  PartyOrganizationReorganizationTable.findAll({
    order: 'createdate DESC'
  }).then(function (PartyOrganizationReorganizationTable) {
    return res.jsonp(PartyOrganizationReorganizationTable);
  }).catch(function (err) {
    logger.error('PartyOrganizationReorganizationTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * PartyOrganizationReorganizationTable middleware
 */
exports.rectifyinginfoByID = function (req, res, next, id) {
  var PartyOrganizationReorganizationTable = sequelize.model('PartyOrganizationReorganizationTable');
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
    PartyOrganizationReorganizationTable.findOne({
      where: {id: id}
    }).then(function (PartyOrganizationReorganizationTable) {
      if (!PartyOrganizationReorganizationTable) {
        logger.error('No PartyOrganizationReorganizationTable with that identifier has been found');
        return res.status(404).send({
          message: 'No PartyOrganizationReorganizationTable with that identifier has been found'
        });
      }

      req.model = PartyOrganizationReorganizationTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('PartyOrganizationReorganizationTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var PartyOrganizationReorganizationTable = sequelize.model('PartyOrganizationReorganizationTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  PartyOrganizationReorganizationTable.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('PartyOrganizationReorganizationTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from PartyOrganizationReorganizationTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId) {
  var PartyOrganizationReorganizationTable = sequelize.model('PartyOrganizationReorganizationTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  PartyOrganizationReorganizationTable.findAll({
    where: {communityid: commId},
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('PartyOrganizationReorganizationTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId) {
  var sql = 'select count(*) sum from PartyOrganizationReorganizationTable ' +
    'where communityid = ' + commId + '';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
