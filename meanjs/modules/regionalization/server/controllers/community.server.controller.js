'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * List of DynamicTable
 */
exports.list = function (req, res) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  CommunityVillageConstant.findAll({
    where: {roles: req.query.roles}
  }).then(function (CommunityVillageConstant) {
    return res.jsonp(CommunityVillageConstant);
  }).catch(function (err) {
    logger.error('CommunityVillageConstant list error:', err);
    return res.status(422).send(err);
  });
};
/**
 * Show the current DynamicTable
 */
exports.read = function (req, res) {
  var CommunityVillageConstant = req.model ? req.model.toJSON() : {};
  res.json(CommunityVillageConstant);
};
/**
 * DynamicTable middleware
 */
exports.communityByID = function (req, res, next, id) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  CommunityVillageConstant.findOne({
    where: {id: id}
  }).then(function (CommunityVillageConstant) {
    if (!CommunityVillageConstant) {
      logger.error('No CommunityVillageConstant with that identifier has been found');
      return res.status(404).send({
        message: 'No CommunityVillageConstant with that identifier has been found'
      });
    }
    req.model = CommunityVillageConstant;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('CommunityVillageConstant ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
