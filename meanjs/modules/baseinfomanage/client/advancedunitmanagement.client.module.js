(function (app) {
  'use strict';

  app.registerModule('advancedUnitManagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('advancedUnitManagement.services');
  app.registerModule('advancedUnitManagement.routes', ['ui.router', 'core.routes', 'advancedUnitManagement.services']);
}(ApplicationConfiguration));
