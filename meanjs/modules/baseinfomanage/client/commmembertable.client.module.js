(function (app) {
  'use strict';

  app.registerModule('commMemberTable', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('commMemberTable.services');
  app.registerModule('commMemberTable.routes', ['ui.router', 'core.routes', 'commMemberTable.services']);
}(ApplicationConfiguration));
