'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an advancedUnitManagement
 */
exports.create = function (req, res) {
  var AdvancedUnitManagement = sequelize.model('AdvancedUnitManagement');
  var advancedUnitManagement = AdvancedUnitManagement.build(req.body);
  advancedUnitManagement.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return advancedUnitManagement.reload()
    .then(function() {
      res.json(advancedUnitManagement);
    });
  }).catch(function (err) {
    logger.error('advancedUnitManagement create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current advancedUnitManagement
 */
exports.read = function (req, res) {
  var advancedUnitManagement = req.model ? req.model.toJSON() : {};
  advancedUnitManagement.isCurrentUserOwner = !!(req.user && advancedUnitManagement.user && advancedUnitManagement.user.id.toString() === req.user.id.toString());

  res.json(advancedUnitManagement);
};

/**
 * Update an advancedUnitManagement
 */
exports.update = function (req, res) {
  var advancedUnitManagement = req.model;

  advancedUnitManagement.name = req.body.name;
  advancedUnitManagement.level = req.body.level;
  advancedUnitManagement.first_declare = req.body.first_declare;
  advancedUnitManagement.last_expired = req.body.last_expired;
  advancedUnitManagement.addrss = req.body.addrss;
  advancedUnitManagement.fzr = req.body.fzr;
  advancedUnitManagement.charge_leader = req.body.charge_leader;
  advancedUnitManagement.full_time_cadre = req.body.full_time_cadre;
  advancedUnitManagement.save().then(function () {
    res.json(advancedUnitManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an advancedUnitManagement
 */
exports.delete = function (req, res) {
  var advancedUnitManagement = req.model;

  advancedUnitManagement.destroy().then(function () {
    res.json(advancedUnitManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of AdvancedUnitManagement
 */
exports.list = function (req, res) {
  var AdvancedUnitManagement = sequelize.model('AdvancedUnitManagement');
  AdvancedUnitManagement.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (advancedUnitManagement) {
    return res.jsonp(advancedUnitManagement);
  }).catch(function (err) {
    logger.error('advancedUnitManagement list error:', err);
    return res.status(422).send(err);
  });
};

//----分页
function listByPage(req, res, limit, offset) {
  var AdvancedUnitManagement = sequelize.model('AdvancedUnitManagement');
  AdvancedUnitManagement.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (listTable) {
    return res.jsonp(listTable);
  }).catch(function (err) {
    logger.error('AdvancedUnitManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from AdvancedUnitManagement';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * AdvancedUnitManagement middleware
 */
exports.advancedUnitManagementByID = function (req, res, next, id) {
  var AdvancedUnitManagement = sequelize.model('AdvancedUnitManagement');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    AdvancedUnitManagement.findOne({
      where: {id: id}
    }).then(function (advancedUnitManagement) {
      if (!advancedUnitManagement) {
        logger.error('No advancedUnitManagement with that identifier has been found');
        return res.status(404).send({
          message: 'No advancedUnitManagement with that identifier has been found'
        });
      }

      req.model = advancedUnitManagement;
      next();
    }).catch(function (err) {
      logger.error('advancedUnitManagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
