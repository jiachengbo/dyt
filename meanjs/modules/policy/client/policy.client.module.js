(function (app) {
  'use strict';

  app.registerModule('policy', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('policy.services');
  app.registerModule('policy.routes', ['ui.router', 'core.routes', 'policy.services']);
}(ApplicationConfiguration));
