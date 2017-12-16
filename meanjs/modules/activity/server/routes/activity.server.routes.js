'use strict';

/**
 * Module dependencies
 */
var activityPolicy = require('../policies/activity.server.policy'),
  activity = require('../controllers/activity.server.controller');

module.exports = function (app) {
  // Activity collection routes
  app.route('/api/activity').all(activityPolicy.isAllowed)
    .get(activity.list)
    .post(activity.create);
  // Single activity routes
  app.route('/api/activity/:activityId').all(activityPolicy.isAllowed)
    .get(activity.read)
    .put(activity.update)
    .delete(activity.delete);

  // Finish by binding the activity middleware
  app.param('activityId', activity.activityByID);
};
