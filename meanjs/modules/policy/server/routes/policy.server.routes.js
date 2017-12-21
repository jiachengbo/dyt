'use strict';

/**
 * Module dependencies
 */
var policyPolicy = require('../policies/policy.server.policy'),
  policy = require('../controllers/policy.server.controller');

module.exports = function (app) {
  // Policy collection routes
  app.route('/api/policy').all(policyPolicy.isAllowed)
    .get(policy.list)
    .post(policy.update);
  // Single policy routes
  app.route('/api/policy/:policyId').all(policyPolicy.isAllowed)
    .get(policy.read)
    .post(policy.update)
    .delete(policy.delete);

  // Finish by binding the policy middleware
  app.param('policyId', policy.policyByID);
};
