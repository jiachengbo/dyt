'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an unionInformationManagement
 */
exports.create = function (req, res) {
  var UnionInformationManagement = sequelize.model('UnionInformationManagement');
  var unionInformationManagement = UnionInformationManagement.build(req.body);

  unionInformationManagement.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return unionInformationManagement.reload()
    .then(function() {
      res.json(unionInformationManagement);
    });
  }).catch(function (err) {
    logger.error('unionInformationManagement create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current unionInformationManagement
 */
exports.read = function (req, res) {
  var unionInformationManagement = req.model ? req.model.toJSON() : {};
  unionInformationManagement.isCurrentUserOwner = !!(req.user && unionInformationManagement.user && unionInformationManagement.user.id.toString() === req.user.id.toString());

  res.json(unionInformationManagement);
};

/**
 * Update an unionInformationManagement
 */
exports.update = function (req, res) {
  var unionInformationManagement = req.model;

  unionInformationManagement.name = req.body.name;
  unionInformationManagement.union_code = req.body.union_code;
  unionInformationManagement.approval_number = req.body.approval_number;
  unionInformationManagement.member_num = req.body.member_num;
  unionInformationManagement.employees_num = req.body.employees_num;
  unionInformationManagement.migrant_workers = req.body.migrant_workers;
  unionInformationManagement.address = req.body.address;
  unionInformationManagement.chairman_name = req.body.chairman_name;
  unionInformationManagement.contact_information = req.body.contact_information;

  unionInformationManagement.save().then(function () {
    res.json(unionInformationManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an unionInformationManagement
 */
exports.delete = function (req, res) {
  var unionInformationManagement = req.model;

  unionInformationManagement.destroy().then(function () {
    res.json(unionInformationManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of UnionInformationManagement
 */
exports.list = function (req, res) {
  var UnionInformationManagement = sequelize.model('UnionInformationManagement');
  UnionInformationManagement.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (unionInformationManagement) {
    return res.jsonp(unionInformationManagement);
  }).catch(function (err) {
    logger.error('unionInformationManagement list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset) {
  var UnionInformationManagement = sequelize.model('UnionInformationManagement');
  UnionInformationManagement.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (unionInformationManagement) {
    return res.jsonp(unionInformationManagement);
  }).catch(function (err) {
    logger.error('UnionInformationManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from UnionInformationManagement';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}

/**
 * UnionInformationManagement middleware
 */
exports.unionInformationManagementByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var UnionInformationManagement = sequelize.model('UnionInformationManagement');
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    UnionInformationManagement.findOne({
      where: {id: id}
    }).then(function (unionInformationManagement) {
      if (!unionInformationManagement) {
        logger.error('No unionInformationManagement with that identifier has been found');
        return res.status(404).send({
          message: 'No unionInformationManagement with that identifier has been found'
        });
      }

      req.model = unionInformationManagement;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('unionInformationManagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
