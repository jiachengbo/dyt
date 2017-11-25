'use strict';

/**
 * Module dependencies
 */
var baseinfomanagePolicy = require('../policies/baseinfomanage.server.policy'),
  baseinfomanage = require('../controllers/baseinfomanage.server.controller');

module.exports = function (app) {
  // Baseinfomanage collection routes
  app.route('/api/baseinfomanage').all(baseinfomanagePolicy.isAllowed)
    .get(baseinfomanage.list)
    .post(baseinfomanage.create);
  // Single baseinfomanage routes
  app.route('/api/baseinfomanage/:baseinfomanageId').all(baseinfomanagePolicy.isAllowed)
    .get(baseinfomanage.read)
    .put(baseinfomanage.update)
    .delete(baseinfomanage.delete);

  // Finish by binding the baseinfomanage middleware
  app.param('baseinfomanageId', baseinfomanage.baseinfomanageByID);
};
