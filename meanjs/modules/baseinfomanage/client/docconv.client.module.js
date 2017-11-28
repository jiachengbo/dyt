(function (app) {
  'use strict';

  app.registerModule('docconv', ['core']);
  app.registerModule('docconv.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
