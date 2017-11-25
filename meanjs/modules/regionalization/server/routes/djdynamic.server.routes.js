'use strict';

/**
 * Module dependencies
 */
var regionalizationPolicy = require('../policies/regionalization.server.policy'),
  dj_dynamic = require('../controllers/djdynamic.server.controller');

module.exports = function (app) {
  // djdynamic collection routes
  app.route('/api/regionalization/djdynamic').all(regionalizationPolicy.isAllowed)
    .get(dj_dynamic.list)
    .post(dj_dynamic.update);
  // Single djdynamic routes
  app.route('/api/regionalization/djdynamic/:dynamicId').all(regionalizationPolicy.isAllowed)
    .get(dj_dynamic.read)
    .post(dj_dynamic.update)
    .delete(dj_dynamic.delete);

  // Finish by binding the djdynamic middleware
  app.param('dynamicId', dj_dynamic.djdynamicByID);
};
