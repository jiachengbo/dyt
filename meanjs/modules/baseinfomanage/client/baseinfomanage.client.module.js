(function (app) {
  'use strict';

  app.registerModule('baseinfomanage', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('baseinfomanage.services');
  app.registerModule('baseinfomanage.routes', ['ui.router', 'core.routes', 'baseinfomanage.services']);
}(ApplicationConfiguration));
