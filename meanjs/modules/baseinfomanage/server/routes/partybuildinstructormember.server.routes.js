'use strict';

/**
 * Module dependencies
 */
var partyBuildInstructorTablePolicy = require('../policies/partybuildinstructortable.server.policy'),
  partyBuildInstructorTable = require('../controllers/partybuildinstructormember.server.controller');

module.exports = function (app) {
  // PartyBuildInstructorTable collection routes
  app.route('/api/partyBuildInstructorMember').all(partyBuildInstructorTablePolicy.isAllowed)
    .get(partyBuildInstructorTable.list)
    .post(partyBuildInstructorTable.create);
  // Single partyBuildInstructorTable routes
  app.route('/api/partyBuildInstructorMember/:partyBuildInstructorMemberId').all(partyBuildInstructorTablePolicy.isAllowed)
    .get(partyBuildInstructorTable.read)
    .post(partyBuildInstructorTable.update)
    .delete(partyBuildInstructorTable.delete);

  // Finish by binding the partyBuildInstructorTable middleware
  app.param('partyBuildInstructorMemberId', partyBuildInstructorTable.partyBuildInstructorMemberByID);
};
