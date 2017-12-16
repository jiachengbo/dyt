'use strict';

/**
 * Module dependencies
 */
var stonehillPolicy = require('../policies/stonehill.server.policy'),
  stonehill = require('../controllers/stonehill.server.controller');

module.exports = function (app) {
  // Stonehill collection routes
  app.route('/api/stonehill').all(stonehillPolicy.isAllowed)
    .get(stonehill.list)
    .post(stonehill.update);
  // Single stonehill routes
  app.route('/api/stonehill/:stonehillId').all(stonehillPolicy.isAllowed)
    .get(stonehill.read)
    .post(stonehill.update)
    .delete(stonehill.delete);

  // Finish by binding the stonehill middleware
  app.param('stonehillId', stonehill.stonehillByID);
};
