'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an baseinfomanage
 */
exports.create = function (req, res) {/*
  var User = sequelize.model('User');
  var Baseinfomanage = sequelize.model('Baseinfomanage');
  var baseinfomanage = Baseinfomanage.build(req.body);

  baseinfomanage.user_id = req.user.id;
  baseinfomanage.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return baseinfomanage.reload({
      include: [
        {
          model: User,
          attributes: ['displayName']
        }
      ]
    })
    .then(function() {
      res.json(baseinfomanage);
    });
  }).catch(function (err) {
    logger.error('baseinfomanage create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });*/
};

/**
 * Show the current baseinfomanage
 */
exports.read = function (req, res) {/*
  var baseinfomanage = req.model ? req.model.toJSON() : {};

  //baseinfomanage.isCurrentUserOwner = !!(req.user && baseinfomanage.user && baseinfomanage.user._id.toString() === req.user._id.toString());
  baseinfomanage.isCurrentUserOwner = !!(req.user && baseinfomanage.user && baseinfomanage.user.id.toString() === req.user.id.toString());

  res.json(baseinfomanage);*/
};

/**
 * Update an baseinfomanage
 */
exports.update = function (req, res) {/*
  var baseinfomanage = req.model;

  baseinfomanage.title = req.body.title;
  baseinfomanage.content = req.body.content;

  baseinfomanage.save().then(function () {
    res.json(baseinfomanage);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });*/
};

/**
 * Delete an baseinfomanage
 */
exports.delete = function (req, res) {/*
  var baseinfomanage = req.model;

  baseinfomanage.destroy().then(function () {
    res.json(baseinfomanage);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });*/
};

/**
 * List of Baseinfomanage
 */
exports.list = function (req, res) {/*
  var Baseinfomanage = sequelize.model('Baseinfomanage');
  var User = sequelize.model('User');

  Baseinfomanage.findAll({
    include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ],
    order: 'id ASC'
  }).then(function (baseinfomanage) {
    return res.jsonp(baseinfomanage);
  }).catch(function (err) {
    logger.error('baseinfomanage list error:', err);
    return res.status(422).send(err);
  });*/
};

/**
 * Baseinfomanage middleware
 */
exports.baseinfomanageByID = function (req, res, next, id) {/*
  var Baseinfomanage = sequelize.model('Baseinfomanage');
  var User = sequelize.model('User');

  Baseinfomanage.findOne({
    where: {id: id},
    include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ]
  }).then(function (baseinfomanage) {
    if (!baseinfomanage) {
      logger.error('No baseinfomanage with that identifier has been found');
      return res.status(404).send({
        message: 'No baseinfomanage with that identifier has been found'
      });
    }

    req.model = baseinfomanage;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('baseinfomanage ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });*/
};
