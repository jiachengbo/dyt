'use strict';

/**
 * Module dependencies
 */
var leagueMemberTablePolicy = require('../policies/leaguemembertable.server.policy'),
  leagueMemberTable = require('../controllers/leaguemembertable.server.controller');

module.exports = function (app) {
  // LeagueMemberTable collection routes
  app.route('/api/leagueMemberTable').all(leagueMemberTablePolicy.isAllowed)
    .get(leagueMemberTable.list)
    .post(leagueMemberTable.create);
  // Single leagueMemberTable routes
  app.route('/api/leagueMemberTable/:leagueMemberTableId').all(leagueMemberTablePolicy.isAllowed)
    .get(leagueMemberTable.read)
    .put(leagueMemberTable.update)
    .delete(leagueMemberTable.delete);

  // Finish by binding the leagueMemberTable middleware
  app.param('leagueMemberTableId', leagueMemberTable.leagueMemberTableByID);
};
