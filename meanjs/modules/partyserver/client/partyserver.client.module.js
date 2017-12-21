(function (app) {
  'use strict';

  app.registerModule('partyserver', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('partyserver.services');
  app.registerModule('partyserver.routes', ['ui.router', 'core.routes', 'partyserver.services']);
}(ApplicationConfiguration));
