(function (app) {
  'use strict';

  app.registerModule('applyNow', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('applyNow.services');
  app.registerModule('applyNow.routes', ['ui.router', 'core.routes', 'applyNow.services']);
}(ApplicationConfiguration));
