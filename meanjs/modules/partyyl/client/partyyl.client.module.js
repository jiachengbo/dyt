(function (app) {
  'use strict';

  app.registerModule('partyyl', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('partyyl.services');
  app.registerModule('partyyl.routes', ['ui.router', 'core.routes', 'partyyl.services']);
}(ApplicationConfiguration));
