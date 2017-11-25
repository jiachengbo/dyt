'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an YLO_table
 */
exports.create = function (req, res) {
  var ylo_table = sequelize.model('YLO_table');
  var YLO_table = ylo_table.build(req.body);
  YLO_table.createdate = new Date();

  YLO_table.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return YLO_table.reload()
      .then(function () {
        res.json(YLO_table);
      });
  }).catch(function (err) {
    logger.error('YLO_table create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current YLO_table
 */
exports.read = function (req, res) {
  var YLO_table = req.model ? req.model.toJSON() : {};

  //YLO_table.isCurrentUserOwner = !!(req.user && YLO_table.user && YLO_table.user._id.toString() === req.user._id.toString());
  YLO_table.isCurrentUserOwner = !!(req.user && YLO_table.user && YLO_table.user.id.toString() === req.user.id.toString());

  res.json(YLO_table);
};

/**
 * Update an YLO_table
 */
exports.update = function (req, res) {
  var YLO_table = req.model;

  YLO_table.ylo_name = req.body.ylo_name;
  YLO_table.ylo_code = req.body.ylo_code;
  YLO_table.ylo_type = req.body.ylo_type;
  YLO_table.ylo_industrytype = req.body.ylo_industrytype;
  YLO_table.ylo_secretary = req.body.ylo_secretary;
  YLO_table.save().then(function () {
    res.json(YLO_table);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an YLO_table
 */
exports.delete = function (req, res) {
  var YLO_table = req.model;

  YLO_table.destroy().then(function () {
    res.json(YLO_table);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of YLO_table
 */
exports.list = function (req, res) {
  var YLO_table = sequelize.model('YLO_table');

  YLO_table.findAll({
    order: 'createdate DESC'
  }).then(function (YLO_table) {
    return res.jsonp(YLO_table);
  }).catch(function (err) {
    logger.error('YLO_table list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * YLO_table middleware
 */
exports.yloByID = function (req, res, next, id) {
  var YLO_table = sequelize.model('YLO_table');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    YLO_table.findOne({
      where: {id: id}
    }).then(function (YLO_table) {
      if (!YLO_table) {
        logger.error('No YLO_table with that identifier has been found');
        return res.status(404).send({
          message: 'No YLO_table with that identifier has been found'
        });
      }

      req.model = YLO_table;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('YLO_table ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var YLO_table = sequelize.model('YLO_table');
  YLO_table.findAll({
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('YLO_table list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from YLO_table';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
