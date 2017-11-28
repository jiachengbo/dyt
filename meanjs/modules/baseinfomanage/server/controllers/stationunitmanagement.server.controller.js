'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an stationUnitManagement
 */
exports.create = function (req, res) {
  var StationUnitManagement = sequelize.model('StationUnitManagement');
  var stationUnitManagement = StationUnitManagement.build(req.body);

  stationUnitManagement.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return stationUnitManagement.reload()
    .then(function() {
      res.json(stationUnitManagement);
    });
  }).catch(function (err) {
    logger.error('stationUnitManagement create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current stationUnitManagement
 */
exports.read = function (req, res) {
  var stationUnitManagement = req.model ? req.model.toJSON() : {};
  stationUnitManagement.isCurrentUserOwner = !!(req.user && stationUnitManagement.user && stationUnitManagement.user.id.toString() === req.user.id.toString());
  res.json(stationUnitManagement);
};

/**
 * Update an stationUnitManagement
 */
exports.update = function (req, res) {
  var stationUnitManagement = req.model;

  stationUnitManagement.name = req.body.name;
  stationUnitManagement.address = req.body.address;
  stationUnitManagement.zip_code = req.body.zip_code;
  stationUnitManagement.contact_information = req.body.contact_information;

  stationUnitManagement.save().then(function () {
    res.json(stationUnitManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an stationUnitManagement
 */
exports.delete = function (req, res) {
  var stationUnitManagement = req.model;

  stationUnitManagement.destroy().then(function () {
    res.json(stationUnitManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of StationUnitManagement
 */
exports.list = function (req, res) {
  var StationUnitManagement = sequelize.model('StationUnitManagement');
  // var User = sequelize.model('User');

  StationUnitManagement.findAll({
    limit: [0, 20],
    order: 'id asc'
  }).then(function (stationUnitManagement) {
    return res.jsonp(stationUnitManagement);
  }).catch(function (err) {
    logger.error('stationUnitManagement list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset) {
  var StationUnitManagement = sequelize.model('StationUnitManagement');
  StationUnitManagement.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (stationUnitManagement) {
    return res.jsonp(stationUnitManagement);
  }).catch(function (err) {
    logger.error('StationUnitManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from StationUnitManagement';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}

/**
 * StationUnitManagement middleware
 */
exports.stationUnitManagementByID = function (req, res, next, id) {
  var StationUnitManagement = sequelize.model('StationUnitManagement');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    StationUnitManagement.findOne({
      where: {id: id}
    }).then(function (stationUnitManagement) {
      if (!stationUnitManagement) {
        logger.error('No stationUnitManagement with that identifier has been found');
        return res.status(404).send({
          message: 'No stationUnitManagement with that identifier has been found'
        });
      }

      req.model = stationUnitManagement;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('stationUnitManagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
