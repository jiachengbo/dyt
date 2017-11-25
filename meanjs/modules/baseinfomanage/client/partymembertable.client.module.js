(function (app) {
  'use strict';

  app.registerModule('partyMemberTable', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('partyMemberTable.services');
  app.registerModule('partyMemberTable.routes', ['ui.router', 'core.routes', 'partyMemberTable.services']);
}(ApplicationConfiguration));
