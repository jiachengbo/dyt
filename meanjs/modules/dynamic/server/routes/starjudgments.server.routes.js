'use strict';

/**
 * Module dependencies
 */
var dynamicPolicy = require('../policies/dynamic.server.policy'),
  dynamic = require('../controllers/starjudgments.server.controller');

module.exports = function (app) {
  // Dynamic collection routes
  app.route('/api/starjudgmentsinfo').all(dynamicPolicy.isAllowed)
    .get(dynamic.list)
    .post(dynamic.update);
  // Single dynamic routes
  app.route('/api/starjudgmentsinfo/:starjudgmentsId').all(dynamicPolicy.isAllowed)
    .get(dynamic.read)
    .post(dynamic.update)
    .delete(dynamic.delete);

  // Finish by binding the dynamic middleware
  app.param('starjudgmentsId', dynamic.starjudgmentsinfoByID);
};
