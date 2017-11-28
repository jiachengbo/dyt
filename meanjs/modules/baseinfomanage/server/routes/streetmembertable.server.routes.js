'use strict';

/**
 * Module dependencies
 */
var streetMemberTablePolicy = require('../policies/streetmembertable.server.policy'),
  streetMemberTable = require('../controllers/streetmembertable.server.controller');

module.exports = function (app) {
  // StreetMemberTable collection routes
  app.route('/api/streetMemberTable').all(streetMemberTablePolicy.isAllowed)
    .get(streetMemberTable.list)
    .post(streetMemberTable.create);
  // Single streetMemberTable routes
  app.route('/api/streetMemberTable/:streetMemberTableId').all(streetMemberTablePolicy.isAllowed)
    .get(streetMemberTable.read)
    .post(streetMemberTable.update)
    .delete(streetMemberTable.delete);

  // Finish by binding the streetMemberTable middleware
  app.param('streetMemberTableId', streetMemberTable.streetMemberTableByID);
};
