'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an basicStationManagement
 * 基层站所管理表
 */
exports.create = function (req, res) {
  var BasicStationManagement = sequelize.model('BasicStationManagement');
  var basicStationManagement = BasicStationManagement.build(req.body);

  basicStationManagement.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return basicStationManagement.reload()
    .then(function() {
      res.json(basicStationManagement);
    });
  }).catch(function (err) {
    logger.error('basicStationManagement create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current basicStationManagement
 */
exports.read = function (req, res) {
  var basicStationManagement = req.model ? req.model.toJSON() : {};
  basicStationManagement.isCurrentUserOwner = !!(req.user && basicStationManagement.user && basicStationManagement.user.id.toString() === req.user.id.toString());

  res.json(basicStationManagement);
};

/**
 * Update an basicStationManagement
 */
exports.update = function (req, res) {
  var basicStationManagement = req.model;

  basicStationManagement.name = req.body.name;
  basicStationManagement.address = req.body.address;
  basicStationManagement.fzr = req.body.fzr;
  basicStationManagement.contact_information = req.body.contact_information;
  basicStationManagement.email = req.body.email;
  basicStationManagement.remark = req.body.remark;

  basicStationManagement.save().then(function () {
    res.json(basicStationManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an basicStationManagement
 */
exports.delete = function (req, res) {
  var basicStationManagement = req.model;

  basicStationManagement.destroy().then(function () {
    res.json(basicStationManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of BasicStationManagement
 */
exports.list = function (req, res) {
  var BasicStationManagement = sequelize.model('BasicStationManagement');
  // var User = sequelize.model('User');

  BasicStationManagement.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (basicStationManagement) {
    return res.jsonp(basicStationManagement);
  }).catch(function (err) {
    logger.error('basicStationManagement list error:', err);
    return res.status(422).send(err);
  });
};
//-------------分页-----------
function listByPage(req, res, limit, offset) {
  var BasicStationManagement = sequelize.model('BasicStationManagement');
  BasicStationManagement.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (basicStationManagement) {
    return res.jsonp(basicStationManagement);
  }).catch(function (err) {
    logger.error('BasicStationManagement list error:', err);
    return res.status(422).send(err);
  });
}
//------------总数----------
function listCount(req, res) {
  var sql = 'select count(*) sum from BasicStationManagement';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * BasicStationManagement middleware
 */
exports.basicStationManagementByID = function (req, res, next, id) {
  var BasicStationManagement = sequelize.model('BasicStationManagement');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    BasicStationManagement.findOne({
      where: {id: id}
    }).then(function (basicStationManagement) {
      if (!basicStationManagement) {
        logger.error('No basicStationManagement with that identifier has been found');
        return res.status(404).send({
          message: 'No basicStationManagement with that identifier has been found'
        });
      }

      req.model = basicStationManagement;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('basicStationManagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
