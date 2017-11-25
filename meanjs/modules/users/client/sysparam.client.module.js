(function (app) {
  'use strict';

  app.registerModule('sysparam', ['users.admin']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('sysparam.services');
  app.registerModule('sysparam.routes', ['users.admin.routes']);
}(ApplicationConfiguration));
