(function (app) {
  'use strict';

  app.registerModule('map', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('map.services');
  app.registerModule('map.routes', ['ui.router', 'core.routes', 'map.services']);
}(ApplicationConfiguration));
