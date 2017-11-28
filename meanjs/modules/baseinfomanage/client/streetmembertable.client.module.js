(function (app) {
  'use strict';

  app.registerModule('streetMemberTable', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('streetMemberTable.services');
  app.registerModule('streetMemberTable.routes', ['ui.router', 'core.routes', 'streetMemberTable.services']);
}(ApplicationConfiguration));
