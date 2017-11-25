'use strict';

/**
 * Module dependencies
 */
var threeMasterMemberManagementPolicy = require('../policies/threemastermembermanagement.server.policy'),
  threeMasterMemberManagement = require('../controllers/threemastermembermanagement.server.controller');

module.exports = function (app) {
  // ThreeMasterMemberManagement collection routes
  app.route('/api/threeMasterMemberManagement').all(threeMasterMemberManagementPolicy.isAllowed)
    .get(threeMasterMemberManagement.list)
    .post(threeMasterMemberManagement.create);
  // Single threeMasterMemberManagement routes
  app.route('/api/threeMasterMemberManagement/:threeMasterMemberManagementId').all(threeMasterMemberManagementPolicy.isAllowed)
    .get(threeMasterMemberManagement.read)
    .put(threeMasterMemberManagement.update)
    .delete(threeMasterMemberManagement.delete);

  // Finish by binding the threeMasterMemberManagement middleware
  app.param('threeMasterMemberManagementId', threeMasterMemberManagement.threeMasterMemberManagementByID);
};
