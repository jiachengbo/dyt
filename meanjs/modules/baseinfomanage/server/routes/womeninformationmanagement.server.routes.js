'use strict';

/**
 * Module dependencies
 */
var womenInformationManagementPolicy = require('../policies/womeninformationmanagement.server.policy'),
  womenInformationManagement = require('../controllers/womeninformationmanagement.server.controller');

module.exports = function (app) {
  // WomenInformationManagement collection routes
  app.route('/api/womenInformationManagement').all(womenInformationManagementPolicy.isAllowed)
    .get(womenInformationManagement.list)
    .post(womenInformationManagement.update);
  // Single womenInformationManagement routes
  app.route('/api/womenInformationManagement/:womenInformationManagementId').all(womenInformationManagementPolicy.isAllowed)
    .get(womenInformationManagement.read)
    .post(womenInformationManagement.update)
    .delete(womenInformationManagement.delete);

  // Finish by binding the womenInformationManagement middleware
  app.param('womenInformationManagementId', womenInformationManagement.womenInformationManagementByID);
};
