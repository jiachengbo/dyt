(function (app) {
  'use strict';

  app.registerModule('stationUnitManagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('stationUnitManagement.services');
  app.registerModule('stationUnitManagement.routes', ['ui.router', 'core.routes', 'stationUnitManagement.services']);
}(ApplicationConfiguration));
