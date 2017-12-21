'use strict';

/**
 * Module dependencies
 */
var littlewishPolicy = require('../policies/littlewish.server.policy'),
  littlewish = require('../controllers/littlewish.server.controller');

module.exports = function (app) {
  // Littlewish collection routes
  app.route('/api/littlewish').all(littlewishPolicy.isAllowed)
    .get(littlewish.list)
    .post(littlewish.create);
  // Single littlewish routes
  app.route('/api/littlewish/:littlewishId').all(littlewishPolicy.isAllowed)
    .get(littlewish.read)
    .put(littlewish.update)
    .delete(littlewish.delete);

  // Finish by binding the littlewish middleware
  app.param('littlewishId', littlewish.littlewishByID);
};
