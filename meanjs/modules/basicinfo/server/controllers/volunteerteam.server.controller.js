'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an VolunteerTeamTable
 */
exports.create = function (req, res) {
  var volunteerTeamTable = sequelize.model('VolunteerTeamTable');
  var VolunteerTeamTable = volunteerTeamTable.build(req.body);
  VolunteerTeamTable.createdate = new Date();

  VolunteerTeamTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return VolunteerTeamTable.reload()
      .then(function () {
        res.json(VolunteerTeamTable);
      });
  }).catch(function (err) {
    logger.error('VolunteerTeamTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current VolunteerTeamTable
 */
exports.read = function (req, res) {
  var VolunteerTeamTable = req.model ? req.model.toJSON() : {};

  //VolunteerTeamTable.isCurrentUserOwner = !!(req.user && VolunteerTeamTable.user && VolunteerTeamTable.user._id.toString() === req.user._id.toString());
  VolunteerTeamTable.isCurrentUserOwner = !!(req.user && VolunteerTeamTable.user && VolunteerTeamTable.user.id.toString() === req.user.id.toString());

  res.json(VolunteerTeamTable);
};

/**
 * Update an VolunteerTeamTable
 */
exports.update = function (req, res) {
  var VolunteerTeamTable = req.model;

  VolunteerTeamTable.name = req.body.name;
  VolunteerTeamTable.sex = req.body.sex;
  VolunteerTeamTable.birthday = req.body.birthday;
  VolunteerTeamTable.address = req.body.address;
  VolunteerTeamTable.tel = req.body.tel;
  VolunteerTeamTable.reasonsforjoining = req.body.reasonsforjoining;
  VolunteerTeamTable.save().then(function () {
    res.json(VolunteerTeamTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an VolunteerTeamTable
 */
exports.delete = function (req, res) {
  var VolunteerTeamTable = req.model;

  VolunteerTeamTable.destroy().then(function () {
    res.json(VolunteerTeamTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of VolunteerTeamTable
 */
exports.list = function (req, res) {
  var VolunteerTeamTable = sequelize.model('VolunteerTeamTable');

  VolunteerTeamTable.findAll({
    order: 'createdate DESC'
  }).then(function (VolunteerTeamTable) {
    return res.jsonp(VolunteerTeamTable);
  }).catch(function (err) {
    logger.error('VolunteerTeamTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * VolunteerTeamTable middleware
 */
exports.volunteerteaminfoByID = function (req, res, next, id) {
  var VolunteerTeamTable = sequelize.model('VolunteerTeamTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    VolunteerTeamTable.findOne({
      where: {id: id}
    }).then(function (VolunteerTeamTable) {
      if (!VolunteerTeamTable) {
        logger.error('No VolunteerTeamTable with that identifier has been found');
        return res.status(404).send({
          message: 'No VolunteerTeamTable with that identifier has been found'
        });
      }

      req.model = VolunteerTeamTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('VolunteerTeamTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var VolunteerTeamTable = sequelize.model('VolunteerTeamTable');
  VolunteerTeamTable.findAll({
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('VolunteerTeamTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from VolunteerTeamTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
