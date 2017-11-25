'use strict';

/**
 * Module dependencies
 */
var dynamicPolicy = require('../policies/dynamic.server.policy'),
  dynamic = require('../controllers/julac.server.controller');

module.exports = function (app) {
  // Dynamic collection routes
  app.route('/api/julacinfo').all(dynamicPolicy.isAllowed)
    .get(dynamic.list)
    .post(dynamic.update);
  // Single dynamic routes
  app.route('/api/julacinfo/:julacId').all(dynamicPolicy.isAllowed)
    .get(dynamic.read)
    .post(dynamic.update)
    .delete(dynamic.delete);

  // Finish by binding the dynamic middleware
  app.param('julacId', dynamic.julacinfoByID);
};
