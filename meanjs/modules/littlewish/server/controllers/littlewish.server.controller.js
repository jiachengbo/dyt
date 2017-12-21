'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an littlewish
 */
exports.create = function (req, res) {
  var Littlewish = sequelize.model('Littlewish');
  var littlewish = Littlewish.build(req.body);
  littlewish.state = '待认领';
  littlewish.fbtime = new Date();
  littlewish.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return littlewish.reload({
    })
    .then(function() {
      res.json(littlewish);
    });
  }).catch(function (err) {
    logger.error('littlewish create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current littlewish
 */
exports.read = function (req, res) {
  var littlewish = req.model ? req.model.toJSON() : {};

  //littlewish.isCurrentUserOwner = !!(req.user && littlewish.user && littlewish.user._id.toString() === req.user._id.toString());
  littlewish.isCurrentUserOwner = !!(req.user && littlewish.user && littlewish.user.id.toString() === req.user.id.toString());

  res.json(littlewish);
};

/**
 * Update an littlewish
 */
exports.update = function (req, res) {
  var littlewish = req.model;

  littlewish.title = req.body.title;
  littlewish.content = req.body.content;
  littlewish.community = req.body.community;
  littlewish.state = req.body.state;
  littlewish.claimperson = req.body.claimperson;
  littlewish.fbperson = req.body.fbperson;

  littlewish.save().then(function () {
    res.json(littlewish);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an littlewish
 */
exports.delete = function (req, res) {
  var littlewish = req.model;

  littlewish.destroy().then(function () {
    res.json(littlewish);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Littlewish
 */
exports.list = function (req, res) {
  var Littlewish = sequelize.model('Littlewish');
  var User = sequelize.model('User');

  Littlewish.findAll({
    order: 'id ASC'
  }).then(function (littlewish) {
    return res.jsonp(littlewish);
  }).catch(function (err) {
    logger.error('littlewish list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Littlewish middleware
 */
exports.littlewishByID = function (req, res, next, id) {
  var Littlewish = sequelize.model('Littlewish');
  var User = sequelize.model('User');

  Littlewish.findOne({
    where: {id: id},
  }).then(function (littlewish) {
    if (!littlewish) {
      logger.error('No littlewish with that identifier has been found');
      return res.status(404).send({
        message: 'No littlewish with that identifier has been found'
      });
    }

    req.model = littlewish;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('littlewish ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
