'use strict';

/**
 * Module dependencies
 */
var yloPolicy = require('../policies/organization.server.policy'),
  ylo = require('../controllers/youthleagueorganizations.server.controller');

module.exports = function (app) {
  // ylo collection routes
  app.route('/api/ylo').all(yloPolicy.isAllowed)
    .get(ylo.list)
    .post(ylo.create);
  // Single ylo routes
  app.route('/api/ylo/:yloId').all(yloPolicy.isAllowed)
    .get(ylo.read)
    .put(ylo.update)
    .delete(ylo.delete);

  // Finish by binding the ylo middleware
  app.param('yloId', ylo.yloByID);
};
