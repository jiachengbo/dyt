'use strict';

/**
 * Module dependencies
 */
var partyMemberTablePolicy = require('../policies/partymembertable.server.policy'),
  partyMemberTable = require('../controllers/partymembertable.server.controller');

module.exports = function (app) {
  // PartyMemberTable collection routes
  app.route('/api/partyMemberTable').all(partyMemberTablePolicy.isAllowed)
    .get(partyMemberTable.list)
    .post(partyMemberTable.create);
  // Single partyMemberTable routes
  app.route('/api/partyMemberTable/:partyMemberTableId').all(partyMemberTablePolicy.isAllowed)
    .get(partyMemberTable.read)
    .put(partyMemberTable.update)
    .delete(partyMemberTable.delete);

  // Finish by binding the partyMemberTable middleware
  app.param('partyMemberTableId', partyMemberTable.partyMemberTableByID);
};
