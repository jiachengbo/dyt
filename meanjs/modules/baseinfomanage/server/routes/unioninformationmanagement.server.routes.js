'use strict';

/**
 * Module dependencies
 */
var unionInformationManagementPolicy = require('../policies/unioninformationmanagement.server.policy'),
  unionInformationManagement = require('../controllers/unioninformationmanagement.server.controller');

module.exports = function (app) {
  // UnionInformationManagement collection routes
  app.route('/api/unionInformationManagement').all(unionInformationManagementPolicy.isAllowed)
    .get(unionInformationManagement.list)
    .post(unionInformationManagement.create);
  // Single unionInformationManagement routes
  app.route('/api/unionInformationManagement/:unionInformationManagementId').all(unionInformationManagementPolicy.isAllowed)
    .get(unionInformationManagement.read)
    .put(unionInformationManagement.update)
    .delete(unionInformationManagement.delete);

  // Finish by binding the unionInformationManagement middleware
  app.param('unionInformationManagementId', unionInformationManagement.unionInformationManagementByID);
};
