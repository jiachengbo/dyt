(function (app) {
  'use strict';

  app.registerModule('leagueOrganizationTable', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('leagueOrganizationTable.services');
  app.registerModule('leagueOrganizationTable.routes', ['ui.router', 'core.routes', 'leagueOrganizationTable.services']);
}(ApplicationConfiguration));
