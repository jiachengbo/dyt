(function (app) {
  'use strict';

  app.registerModule('womenInformationManagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('womenInformationManagement.services');
  app.registerModule('womenInformationManagement.routes', ['ui.router', 'core.routes', 'womenInformationManagement.services']);
}(ApplicationConfiguration));
