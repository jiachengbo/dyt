'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an leagueMemberTable
 */
exports.create = function (req, res) {
  var LeagueMemberTable = sequelize.model('LeagueMemberTable');
  var leagueMemberTable = LeagueMemberTable.build(req.body);
  leagueMemberTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return leagueMemberTable.reload()
    .then(function() {
      res.json(leagueMemberTable);
    });
  }).catch(function (err) {
    logger.error('leagueMemberTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current leagueMemberTable
 */
exports.read = function (req, res) {
  var leagueMemberTable = req.model ? req.model.toJSON() : {};
  leagueMemberTable.isCurrentUserOwner = !!(req.user && leagueMemberTable.user && leagueMemberTable.user.id.toString() === req.user.id.toString());

  res.json(leagueMemberTable);
};

/**
 * Update an leagueMemberTable
 */
exports.update = function (req, res) {
  var leagueMemberTable = req.model;

  leagueMemberTable.name = req.body.name;
  leagueMemberTable.nation = req.body.nation;
  leagueMemberTable.sex = req.body.sex;
  leagueMemberTable.birthday = req.body.birthday;
  leagueMemberTable.id_card = req.body.id_card;
  leagueMemberTable.phone = req.body.phone;
  leagueMemberTable.league_branch = req.body.league_branch;
  leagueMemberTable.community = req.body.community;
  leagueMemberTable.education = req.body.education;
  leagueMemberTable.join_time = req.body.join_time;
  leagueMemberTable.politics_status = req.body.politics_status;
  leagueMemberTable.is_local = req.body.is_local;
  leagueMemberTable.email = req.body.email;

  leagueMemberTable.save().then(function () {
    res.json(leagueMemberTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an leagueMemberTable
 */
exports.delete = function (req, res) {
  var leagueMemberTable = req.model;

  leagueMemberTable.destroy().then(function () {
    res.json(leagueMemberTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of LeagueMemberTable
 */
exports.list = function (req, res) {
  var LeagueMemberTable = sequelize.model('LeagueMemberTable');

  LeagueMemberTable.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (leagueMemberTable) {
    return res.jsonp(leagueMemberTable);
  }).catch(function (err) {
    logger.error('leagueMemberTable list error:', err);
    return res.status(422).send(err);
  });
};

//----分页
function listByPage(req, res, limit, offset) {
  var LeagueMemberTable = sequelize.model('LeagueMemberTable');
  LeagueMemberTable.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (leagueMemberTable) {
    return res.jsonp(leagueMemberTable);
  }).catch(function (err) {
    logger.error('LeagueMemberTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from LeagueMemberTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * LeagueMemberTable middleware
 */
exports.leagueMemberTableByID = function (req, res, next, id) {
  var LeagueMemberTable = sequelize.model('LeagueMemberTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    LeagueMemberTable.findOne({
      where: {id: id}
    }).then(function (leagueMemberTable) {
      if (!leagueMemberTable) {
        logger.error('No leagueMemberTable with that identifier has been found');
        return res.status(404).send({
          message: 'No leagueMemberTable with that identifier has been found'
        });
      }

      req.model = leagueMemberTable;
      next();
    }).catch(function (err) {
      logger.error('leagueMemberTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
