'use strict';

/**
 * Module dependencies
 */
var partyOrganizationTablePolicy = require('../policies/partyorganizationtable.server.policy'),
  partyOrganizationTable = require('../controllers/partyorganizationtable.server.controller');

module.exports = function (app) {
  // PartyOrganizationTable collection routes
  app.route('/api/partyfuwu').get(partyOrganizationTable.partyfuwulist);
  app.route('/api/partyOrganizationTable').all(partyOrganizationTablePolicy.isAllowed)
    .get(partyOrganizationTable.list)
    .post(partyOrganizationTable.create);
  // Single partyOrganizationTable routes
  app.route('/api/partyOrganizationTable/:partyOrganizationTableId').all(partyOrganizationTablePolicy.isAllowed)
    .get(partyOrganizationTable.read)
    .put(partyOrganizationTable.update)
    .delete(partyOrganizationTable.delete);

  // Finish by binding the partyOrganizationTable middleware
  app.param('partyOrganizationTableId', partyOrganizationTable.partyOrganizationTableByID);
};
