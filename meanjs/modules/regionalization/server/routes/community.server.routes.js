'use strict';

/**
 * Module dependencies
 */
var regionalizationPolicy = require('../policies/regionalization.server.policy'),
  community = require('../controllers/community.server.controller');

module.exports = function (app) {
  // djdynamic collection routes
  app.route('/api/regionalization/community').all(regionalizationPolicy.isAllowed)
    .get(community.list);
  // Single djdynamic routes
  app.route('/api/regionalization/community/:communityId').all(regionalizationPolicy.isAllowed)
    .get(community.read);
  // Finish by binding the djdynamic middleware
  app.param('communityId', community.communityByID);
};
