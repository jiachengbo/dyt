(function (app) {
  'use strict';

  app.registerModule('core', ['ls.bmap']);
  app.registerModule('core.services');
  app.registerModule('core.routes', ['ui.router']);
  app.registerModule('core.admin', ['core']);
  app.registerModule('core.admin.routes', ['ui.router']);
}(ApplicationConfiguration));
