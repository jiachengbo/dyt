(function (app) {
  'use strict';

  app.registerModule('areadepartmentmanagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('areadepartmentmanagement.services');
  app.registerModule('areadepartmentmanagement.routes', ['ui.router', 'core.routes', 'areadepartmentmanagement.services']);
}(ApplicationConfiguration));
