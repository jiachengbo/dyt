'use strict';

/**
 * Module dependencies
 */
var dynamicinfoPolicy = require('../policies/dynamic.server.policy'),
  dynamicinfo = require('../controllers/learningdynamics.server.controller');

module.exports = function (app) {
  // dynamicinfo collection routes
  app.route('/api/learningdynamicsinfo').all(dynamicinfoPolicy.isAllowed)
    .get(dynamicinfo.list)
    .post(dynamicinfo.update);
  // Single dynamicinfo routes
  app.route('/api/learningdynamicsinfo/:learningdynamicsId').all(dynamicinfoPolicy.isAllowed)
    .get(dynamicinfo.read)
    .post(dynamicinfo.update)
    .delete(dynamicinfo.delete);

  // Finish by binding the dynamicinfo middleware
  app.param('learningdynamicsId', dynamicinfo.learningdynamicsinfoByID);
};
