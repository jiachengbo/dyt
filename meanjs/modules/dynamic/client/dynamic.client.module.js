(function (app) {
  'use strict';

  app.registerModule('dynamic', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('dynamic.services');
  app.registerModule('dynamic.routes', ['ui.router', 'core.routes', 'dynamic.services']);
}(ApplicationConfiguration));
