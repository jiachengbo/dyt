(function (app) {
  'use strict';

  app.registerModule('partyBuildInstructorTable', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('partyBuildInstructorTable.services');
  app.registerModule('partyBuildInstructorTable.routes', ['ui.router', 'core.routes', 'partyBuildInstructorTable.services']);
}(ApplicationConfiguration));
