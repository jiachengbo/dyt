'use strict';

/**
 * Module dependencies
 */
var advancedUnitManagementPolicy = require('../policies/advancedunitmanagement.server.policy'),
  advancedUnitManagement = require('../controllers/advancedunitmanagement.server.controller');

module.exports = function (app) {
  // AdvancedUnitManagement collection routes
  app.route('/api/advancedUnitManagement').all(advancedUnitManagementPolicy.isAllowed)
    .get(advancedUnitManagement.list)
    .post(advancedUnitManagement.create);
  // Single advancedUnitManagement routes
  app.route('/api/advancedUnitManagement/:advancedUnitManagementId').all(advancedUnitManagementPolicy.isAllowed)
    .get(advancedUnitManagement.read)
    .put(advancedUnitManagement.update)
    .delete(advancedUnitManagement.delete);

  // Finish by binding the advancedUnitManagement middleware
  app.param('advancedUnitManagementId', advancedUnitManagement.advancedUnitManagementByID);
};
