(function (app) {
  'use strict';

  app.registerModule('unionInformationManagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('unionInformationManagement.services');
  app.registerModule('unionInformationManagement.routes', ['ui.router', 'core.routes', 'unionInformationManagement.services']);
}(ApplicationConfiguration));
