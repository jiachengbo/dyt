'use strict';

/**
 * Module dependencies
 */
var publicprojectPolicy = require('../policies/publicproject.server.policy'),
  publicproject = require('../controllers/publicproject.server.controller');

module.exports = function (app) {
  // Publicproject collection routes
  app.route('/api/publicproject').all(publicprojectPolicy.isAllowed)
    .get(publicproject.list)
    .post(publicproject.update);
  // Single publicproject routes
  app.route('/api/publicproject/:publicprojectId').all(publicprojectPolicy.isAllowed)
    .get(publicproject.read)
    .post(publicproject.update)
    .delete(publicproject.delete);

  // Finish by binding the publicproject middleware
  app.param('publicprojectId', publicproject.publicprojectByID);
};
