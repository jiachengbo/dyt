'use strict';

/**
 * Module dependencies
 */
var stationUnitManagementPolicy = require('../policies/stationunitmanagement.server.policy'),
  stationUnitManagement = require('../controllers/stationunitmanagement.server.controller');

module.exports = function (app) {
  // StationUnitManagement collection routes
  app.route('/api/stationUnitManagement').all(stationUnitManagementPolicy.isAllowed)
    .get(stationUnitManagement.list)
    .post(stationUnitManagement.create);
  // Single stationUnitManagement routes
  app.route('/api/stationUnitManagement/:stationUnitManagementId').all(stationUnitManagementPolicy.isAllowed)
    .get(stationUnitManagement.read)
    .put(stationUnitManagement.update)
    .delete(stationUnitManagement.delete);

  // Finish by binding the stationUnitManagement middleware
  app.param('stationUnitManagementId', stationUnitManagement.stationUnitManagementByID);
};
