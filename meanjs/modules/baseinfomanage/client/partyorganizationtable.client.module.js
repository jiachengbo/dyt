(function (app) {
  'use strict';

  app.registerModule('partyOrganizationTable', ['core', 'ls.bmap']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('partyOrganizationTable.services');
  app.registerModule('partyOrganizationTable.routes', ['ui.router', 'core.routes', 'partyOrganizationTable.services']);
}(ApplicationConfiguration));
