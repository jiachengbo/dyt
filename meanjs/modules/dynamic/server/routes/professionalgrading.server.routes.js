'use strict';

/**
 * Module dependencies
 */
var dynamicPolicy = require('../policies/dynamic.server.policy'),
  dynamic = require('../controllers/professionalgrading.server.controller');

module.exports = function (app) {
  // Dynamic collection routes
  app.route('/api/professionalgradinginfo').all(dynamicPolicy.isAllowed)
    .get(dynamic.list)
    .post(dynamic.update);
  // Single dynamic routes
  app.route('/api/professionalgradinginfo/:professionalgradingId').all(dynamicPolicy.isAllowed)
    .get(dynamic.read)
    .post(dynamic.update)
    .delete(dynamic.delete);

  // Finish by binding the dynamic middleware
  app.param('professionalgradingId', dynamic.professionalgradinginfoByID);
};
