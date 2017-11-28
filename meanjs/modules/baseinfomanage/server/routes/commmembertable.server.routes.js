'use strict';

/**
 * Module dependencies
 */
var commMemberTablePolicy = require('../policies/commmembertable.server.policy'),
  commMemberTable = require('../controllers/commmembertable.server.controller');

module.exports = function (app) {
  // CommMemberTable collection routes
  app.route('/api/commMemberTable').all(commMemberTablePolicy.isAllowed)
    .get(commMemberTable.list)
    .post(commMemberTable.create);
  // Single commMemberTable routes
  app.route('/api/commMemberTable/:commMemberTableId').all(commMemberTablePolicy.isAllowed)
    .get(commMemberTable.read)
    .post(commMemberTable.update)
    .delete(commMemberTable.delete);

  // Finish by binding the commMemberTable middleware
  app.param('commMemberTableId', commMemberTable.commMemberTableByID);
};
