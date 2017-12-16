(function (app) {
  'use strict';

  app.registerModule('stonehill', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('stonehill.services');
  app.registerModule('stonehill.routes', ['ui.router', 'core.routes', 'stonehill.services']);
}(ApplicationConfiguration));
