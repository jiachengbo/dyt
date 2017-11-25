'use strict';

/**
 * Module dependencies
 */
var leagueOrganizationTablePolicy = require('../policies/leagueorganizationtable.server.policy'),
  leagueOrganizationTable = require('../controllers/leagueorganizationtable.server.controller');

module.exports = function (app) {
  // LeagueOrganizationTable collection routes
  app.route('/api/leagueOrganizationTable').all(leagueOrganizationTablePolicy.isAllowed)
    .get(leagueOrganizationTable.list)
    .post(leagueOrganizationTable.create);
  // Single leagueOrganizationTable routes
  app.route('/api/leagueOrganizationTable/:leagueOrganizationTableId').all(leagueOrganizationTablePolicy.isAllowed)
    .get(leagueOrganizationTable.read)
    .put(leagueOrganizationTable.update)
    .delete(leagueOrganizationTable.delete);

  // Finish by binding the leagueOrganizationTable middleware
  app.param('leagueOrganizationTableId', leagueOrganizationTable.leagueOrganizationTableByID);
};
