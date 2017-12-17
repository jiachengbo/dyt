'use strict';

/**
 * Module dependencies
 */
var partyylPolicy = require('../policies/partyyl.server.policy'),
  partyyl = require('../controllers/partyyl.server.controller');

module.exports = function (app) {
  // Partyyl collection routes
  app.route('/api/partyyl')
    .get(partyyl.list)
    .post(partyyl.update);
  // Single partyyl routes
  app.route('/api/partyyl/:partyylId').all(partyylPolicy.isAllowed)
    .get(partyyl.read)
    .post(partyyl.update)
    .delete(partyyl.delete);

  // Finish by binding the partyyl middleware
  app.param('partyylId', partyyl.partyylByID);
};
