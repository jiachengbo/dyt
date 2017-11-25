'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an leagueOrganizationTable
 */
exports.create = function (req, res) {
  var LeagueOrganizationTable = sequelize.model('LeagueOrganizationTable');
  var leagueOrganizationTable = LeagueOrganizationTable.build(req.body);
  leagueOrganizationTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return leagueOrganizationTable.reload()
    .then(function() {
      res.json(leagueOrganizationTable);
    });
  }).catch(function (err) {
    logger.error('leagueOrganizationTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current leagueOrganizationTable
 */
exports.read = function (req, res) {
  var leagueOrganizationTable = req.model ? req.model.toJSON() : {};
  leagueOrganizationTable.isCurrentUserOwner = !!(req.user && leagueOrganizationTable.user && leagueOrganizationTable.user.id.toString() === req.user.id.toString());

  res.json(leagueOrganizationTable);
};

/**
 * Update an leagueOrganizationTable
 */
exports.update = function (req, res) {
  var leagueOrganizationTable = req.model;

  leagueOrganizationTable.name = req.body.name;
  leagueOrganizationTable.code = req.body.code;
  leagueOrganizationTable.organization_type = req.body.organization_type;
  leagueOrganizationTable.trade_type = req.body.trade_type;
  leagueOrganizationTable.secretary = req.body.secretary;

  leagueOrganizationTable.save().then(function () {
    res.json(leagueOrganizationTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an leagueOrganizationTable
 */
exports.delete = function (req, res) {
  var leagueOrganizationTable = req.model;

  leagueOrganizationTable.destroy().then(function () {
    res.json(leagueOrganizationTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of LeagueOrganizationTable
 */
exports.list = function (req, res) {
  var LeagueOrganizationTable = sequelize.model('LeagueOrganizationTable');
  LeagueOrganizationTable.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (leagueOrganizationTable) {
    return res.jsonp(leagueOrganizationTable);
  }).catch(function (err) {
    logger.error('leagueOrganizationTable list error:', err);
    return res.status(422).send(err);
  });
};

//----分页
function listByPage(req, res, limit, offset) {
  var LeagueOrganizationTable = sequelize.model('LeagueOrganizationTable');
  LeagueOrganizationTable.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (commMemberTable) {
    return res.jsonp(commMemberTable);
  }).catch(function (err) {
    logger.error('LeagueOrganizationTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from LeagueOrganizationTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}

/**
 * LeagueOrganizationTable middleware
 */
exports.leagueOrganizationTableByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var LeagueOrganizationTable = sequelize.model('LeagueOrganizationTable');
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    LeagueOrganizationTable.findOne({
      where: {id: id}
    }).then(function (leagueOrganizationTable) {
      if (!leagueOrganizationTable) {
        logger.error('No leagueOrganizationTable with that identifier has been found');
        return res.status(404).send({
          message: 'No leagueOrganizationTable with that identifier has been found'
        });
      }

      req.model = leagueOrganizationTable;
      next();
    }).catch(function (err) {
      logger.error('leagueOrganizationTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
