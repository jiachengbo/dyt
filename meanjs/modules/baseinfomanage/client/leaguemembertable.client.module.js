(function (app) {
  'use strict';

  app.registerModule('leagueMemberTable', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('leagueMemberTable.services');
  app.registerModule('leagueMemberTable.routes', ['ui.router', 'core.routes', 'leagueMemberTable.services']);
}(ApplicationConfiguration));
