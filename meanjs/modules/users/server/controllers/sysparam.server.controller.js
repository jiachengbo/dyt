'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  dbTools = require(path.resolve('./config/private/dbtools')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an sysParam
 */
exports.create = function (req, res) {
  return dbTools.setParam(req.body.name, req.body.data)
    .then(function(result) {
      res.json(result);
    })
    .catch(function (err) {
      logger.error('sysParam create error:', err);
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Show the current sysParam
 */
exports.read = function (req, res) {
  var sysParam = req.model ? req.model : {};
  res.json(sysParam);
};

/**
 * Update an sysParam
 */
exports.update = function (req, res) {
  return dbTools.setParam(req.body.name, req.body.data)
    .then(function (result) {
      //req.query 中有原有变量信息
      //如果主key改变，删除原变量
      if (req.query.name !== req.body.name) {
        return dbTools.delParam(req.query.name)
          .then(function () {
            return result;
          });
      } else {
        return result;
      }
    })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * Delete an sysParam
 */
exports.delete = function (req, res) {
  var sysParam = req.model;

  return dbTools.delParam(sysParam.name)
    .then(function () {
      res.json(sysParam);
    })
    .catch(function (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * List of SysParam
 */
exports.list = function (req, res) {
  var params = dbTools.getAllParam();
  var ret = [];
  for (var name in params) {
    var v = {
      name: name,
      data: params[name]
    };
    ret.push(v);
  }
  return res.jsonp(ret);
};

/**
 * SysParam middleware
 */
exports.sysParamByID = function (req, res, next, id) {
  if (!dbTools.haveParam(id)) {
    logger.error('No sysParam with that identifier has been found:' + id);
    return res.status(404).send({
      message: 'No sysParam with that identifier has been found:' + id
    });
  } else {
    req.model = {name: id, data: dbTools.getParam(id)};
    next();
  }
};
