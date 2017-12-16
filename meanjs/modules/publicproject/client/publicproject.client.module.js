(function (app) {
  'use strict';

  app.registerModule('publicproject', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('publicproject.services');
  app.registerModule('publicproject.routes', ['ui.router', 'core.routes', 'publicproject.services']);
}(ApplicationConfiguration));
