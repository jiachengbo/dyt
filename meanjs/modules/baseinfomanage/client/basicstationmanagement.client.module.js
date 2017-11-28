(function (app) {
  'use strict';

  app.registerModule('basicStationManagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('basicStationManagement.services');
  app.registerModule('basicStationManagement.routes', ['ui.router', 'core.routes', 'basicStationManagement.services']);
}(ApplicationConfiguration));
