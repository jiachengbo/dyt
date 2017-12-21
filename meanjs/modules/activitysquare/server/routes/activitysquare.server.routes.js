'use strict';

/**
 * Module dependencies
 */
var activitysquarePolicy = require('../policies/activitysquare.server.policy'),
  activitysquare = require('../controllers/activitysquare.server.controller');

module.exports = function (app) {
  // Activitysquare collection routes
  app.route('/api/activitysquare').all(activitysquarePolicy.isAllowed)
    .get(activitysquare.list)
    .post(activitysquare.update);
  // Single activitysquare routes
  app.route('/api/activitysquare/:activitysquareId').all(activitysquarePolicy.isAllowed)
    .get(activitysquare.read)
    .post(activitysquare.update)
    .delete(activitysquare.delete);

  // Finish by binding the activitysquare middleware
  app.param('activitysquareId', activitysquare.activitysquareByID);
};
