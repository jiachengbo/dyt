'use strict';

/**
 * Module dependencies
 */
var partyBuildInstructorTablePolicy = require('../policies/partybuildinstructortable.server.policy'),
  partyBuildInstructorTable = require('../controllers/partybuildinstructortable.server.controller');

module.exports = function (app) {
  // PartyBuildInstructorTable collection routes
  app.route('/api/partyBuildInstructorTable').all(partyBuildInstructorTablePolicy.isAllowed)
    .get(partyBuildInstructorTable.list)
    .post(partyBuildInstructorTable.create);
  // Single partyBuildInstructorTable routes
  app.route('/api/partyBuildInstructorTable/:partyBuildInstructorTableId').all(partyBuildInstructorTablePolicy.isAllowed)
    .get(partyBuildInstructorTable.read)
    .put(partyBuildInstructorTable.update)
    .delete(partyBuildInstructorTable.delete);

  // Finish by binding the partyBuildInstructorTable middleware
  app.param('partyBuildInstructorTableId', partyBuildInstructorTable.partyBuildInstructorTableByID);
};
