(function (app) {
  'use strict';

  app.registerModule('threeMasterMemberManagement', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('threeMasterMemberManagement.services');
  app.registerModule('threeMasterMemberManagement.routes', ['ui.router', 'core.routes', 'threeMasterMemberManagement.services']);
}(ApplicationConfiguration));
