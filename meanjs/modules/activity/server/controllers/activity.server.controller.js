'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an activity
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var Activity = sequelize.model('Activity');
  var activity = Activity.build(req.body);

  activity.user_id = req.user.id;
  activity.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return activity.reload({
      include: [
        {
          model: User,
          attributes: ['displayName']
        }
      ]
    })
    .then(function() {
      res.json(activity);
    });
  }).catch(function (err) {
    logger.error('activity create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current activity
 */
exports.read = function (req, res) {
  var activity = req.model ? req.model.toJSON() : {};

  //activity.isCurrentUserOwner = !!(req.user && activity.user && activity.user._id.toString() === req.user._id.toString());
  activity.isCurrentUserOwner = !!(req.user && activity.user && activity.user.id.toString() === req.user.id.toString());

  res.json(activity);
};

/**
 * Update an activity
 */
exports.update = function (req, res) {
  var activity = req.model;

  activity.title = req.body.title;
  activity.content = req.body.content;

  activity.save().then(function () {
    res.json(activity);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an activity
 */
exports.delete = function (req, res) {
  var activity = req.model;

  activity.destroy().then(function () {
    res.json(activity);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Activity
 */
exports.list = function (req, res) {
  var Activity = sequelize.model('Activity');
  var User = sequelize.model('User');

  Activity.findAll({
    include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ],
    order: 'id ASC'
  }).then(function (activity) {
    return res.jsonp(activity);
  }).catch(function (err) {
    logger.error('activity list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * Activity middleware
 */
exports.activityByID = function (req, res, next, id) {
  var Activity = sequelize.model('Activity');
  var User = sequelize.model('User');

  Activity.findOne({
    where: {id: id},
    include: [
      {
        model: User,
        attributes: ['displayName']
      }
    ]
  }).then(function (activity) {
    if (!activity) {
      logger.error('No activity with that identifier has been found');
      return res.status(404).send({
        message: 'No activity with that identifier has been found'
      });
    }

    req.model = activity;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('activity ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
