'use strict';

/**
 * Module dependencies
 */
var areadepartmentmanagementPolicy = require('../policies/areadepartmentmanagement.server.policy'),
  areadepartmentmanagement = require('../controllers/areadepartmentmanagement.server.controller');

module.exports = function (app) {
  // Areadepartmentmanagement collection routes
  app.route('/api/areadepartmentmanagement').all(areadepartmentmanagementPolicy.isAllowed)
    .get(areadepartmentmanagement.list)
    .post(areadepartmentmanagement.create);
  // Single areadepartmentmanagement routes
  app.route('/api/areadepartmentmanagement/:areadepartmentmanagementId').all(areadepartmentmanagementPolicy.isAllowed)
    .get(areadepartmentmanagement.read)
    .put(areadepartmentmanagement.update)
    .delete(areadepartmentmanagement.delete);

  // Finish by binding the areadepartmentmanagement middleware
  app.param('areadepartmentmanagementId', areadepartmentmanagement.areadepartmentmanagementByID);
};
