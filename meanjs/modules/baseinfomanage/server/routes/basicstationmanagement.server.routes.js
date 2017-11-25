'use strict';

/**
 * Module dependencies
 */
var basicStationManagementPolicy = require('../policies/basicstationmanagement.server.policy'),
  basicStationManagement = require('../controllers/basicstationmanagement.server.controller');

module.exports = function (app) {
  // BasicStationManagement collection routes
  app.route('/api/basicStationManagement').all(basicStationManagementPolicy.isAllowed)
    .get(basicStationManagement.list)
    .post(basicStationManagement.create);
  // Single basicStationManagement routes
  app.route('/api/basicStationManagement/:basicStationManagementId').all(basicStationManagementPolicy.isAllowed)
    .get(basicStationManagement.read)
    .put(basicStationManagement.update)
    .delete(basicStationManagement.delete);

  // Finish by binding the basicStationManagement middleware
  app.param('basicStationManagementId', basicStationManagement.basicStationManagementByID);
};
