(function (app) {
  'use strict';

  app.registerModule('littlewish', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('littlewish.services');
  app.registerModule('littlewish.routes', ['ui.router', 'core.routes', 'littlewish.services']);
}(ApplicationConfiguration));
