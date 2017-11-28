(function (app) {
  'use strict';

  app.registerModule('organization', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('organization.services');
  app.registerModule('organization.routes', ['ui.router', 'core.routes', 'organization.services']);
}(ApplicationConfiguration));
