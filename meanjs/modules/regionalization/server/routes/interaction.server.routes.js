'use strict';

/**
 * Module dependencies
 */
var regionalizationPolicy = require('../policies/regionalization.server.policy'),
  interaction = require('../controllers/interaction.server.controller');

module.exports = function (app) {
  // djdynamic collection routes
  app.route('/api/regionalization/interaction').all(regionalizationPolicy.isAllowed)
    .get(interaction.list)
    .post(interaction.create);
  // Single djdynamic routes
  app.route('/api/regionalization/interaction/:interactionId').all(regionalizationPolicy.isAllowed)
    .get(interaction.read)
    .put(interaction.update)
    .delete(interaction.delete);

  // Finish by binding the djdynamic middleware
  app.param('interactionId', interaction.interactionByID);
};
