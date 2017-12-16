(function (app) {
  'use strict';

  app.registerModule('activity', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('activity.services');
  app.registerModule('activity.routes', ['ui.router', 'core.routes', 'activity.services']);
}(ApplicationConfiguration));
