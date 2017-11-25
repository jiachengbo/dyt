'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  config = require(path.resolve('./config/config')),
  multer = require(path.resolve('./config/private/multer')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

//创建项目Logo对象
var uploadImage = new multer('projectLogofileimg',
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage.mkPaths();
exports.create = function (req, res) {
  var projectTable = sequelize.model('ProjectTable');
  var ProjectTable = projectTable.build(req.body);
  var newingImageUrl;
  if (ProjectTable) {
    uploadImage.recv(req, res, [{name: 'projectlogo'}])
      .then(updateUserInfo)
      .then(function () {
        res.json(ProjectTable);
      })
      .catch(function (err) {
        logger.error('上传照片失败:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'ProjectTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (ProjectTable) {
        if (files && files.projectlogo && files.projectlogo.length === 1) {
          ProjectTable.projectlogo = path.join(uploadImage.mountDir, files.projectlogo[0].filename).replace(/\\/g, '/');
          newingImageUrl = ProjectTable.projectlogo;
        }
        ProjectTable.projectname = req.body.projectname;
        ProjectTable.projectsummary = req.body.projectsummary;
        ProjectTable.measure = req.body.measure;
        ProjectTable.projecttype = req.body.projecttype;
        ProjectTable.state = req.body.state;
        ProjectTable.source = req.body.source;
        ProjectTable.communityid = req.body.communityid;
        ProjectTable.sbtime = req.body.sbtime;
        ProjectTable.finishtime = req.body.finishtime;
        ProjectTable.createdate = new Date();
        ProjectTable.head = req.body.head;
        ProjectTable.people = req.body.people;
        ProjectTable.company = req.body.company;
        //图片
        ProjectTable.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no projectlogo img upload'));
      }
    });
  }
};

/**
 * Show the current ProjectTable
 */
exports.read = function (req, res) {
  var ProjectTable = req.model ? req.model.toJSON() : {};
  ProjectTable.isCurrentUserOwner = !!(req.user && ProjectTable.user && ProjectTable.user.id.toString() === req.user.id.toString());
  res.json(ProjectTable);
};

/**
 * Update an ProjectTable
 */
exports.update = function (req, res) {
  var ProjectTable = req.model;
  var existingImageUrl;
  var newingImageUrl;
  if (ProjectTable) {
    existingImageUrl = ProjectTable.projectlogo;
    uploadImage.recv(req, res, [{name: 'projectlogo'}])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(ProjectTable);
      })
      .catch(function (err) {
        logger.error('recv upload ProjectTable picture err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'ProjectTable is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (ProjectTable) {
        if (files && files.projectlogo && files.projectlogo.length === 1) {
          ProjectTable.projectlogo = path.join(uploadImage.mountDir, files.projectlogo[0].filename).replace(/\\/g, '/');
          newingImageUrl = ProjectTable.projectlogo;
        }
        ProjectTable.projectname = req.body.projectname;
        ProjectTable.projectsummary = req.body.projectsummary;
        ProjectTable.measure = req.body.measure;
        ProjectTable.projecttype = req.body.projecttype;
        ProjectTable.state = req.body.state;
        ProjectTable.source = req.body.source;
        ProjectTable.communityid = req.body.communityid;
        ProjectTable.sbtime = req.body.sbtime;
        ProjectTable.finishtime = req.body.finishtime;
        ProjectTable.head = req.body.head;
        ProjectTable.people = req.body.people;
        ProjectTable.company = req.body.company;
        //图片
        ProjectTable.save().then(function () {
          resolve();
        }).catch(function (err) {
          reject(err);
        });
      } else {
        reject(new Error('no projectlogo img upload'));
      }
    });
  }

  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
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
    });
  }
};
/**
 * Delete an ProjectTable
 */
exports.delete = function (req, res) {
  var ProjectTable = req.model;

  ProjectTable.destroy().then(function () {
    res.json(ProjectTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of ProjectTable
 */
exports.list = function (req, res) {
  var ProjectTable = sequelize.model('ProjectTable');

  ProjectTable.findAll({
    order: 'createdate ASC'
  }).then(function (ProjectTable) {
    return res.jsonp(ProjectTable);
  }).catch(function (err) {
    logger.error('ProjectTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * ProjectTable middleware
 */
exports.projectByID = function (req, res, next, id) {
  var ProjectTable = sequelize.model('ProjectTable');
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
    ProjectTable.findOne({
      where: {projectid: id}
    }).then(function (ProjectTable) {
      if (!ProjectTable) {
        logger.error('No ProjectTable with that identifier has been found');
        return res.status(404).send({
          message: 'No ProjectTable with that identifier has been found'
        });
      }
      req.model = ProjectTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('ProjectTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};

//----分页
function listByPage(req, res, limit, offset) {
  var ProjectTable = sequelize.model('ProjectTable');
  ProjectTable.findAll({
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (ProjectTable) {
    return res.jsonp(ProjectTable);
  }).catch(function (err) {
    logger.error('ProjectTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from ProjectTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId) {
  var ProjectTable = sequelize.model('ProjectTable');
  ProjectTable.findAll({
    where: {communityid: commId},
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (ProjectTable) {
    return res.jsonp(ProjectTable);
  }).catch(function (err) {
    logger.error('ProjectTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId) {
  var sql = 'select count(*) sum from ProjectTable where communityid = ' + commId + '';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
