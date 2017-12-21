'use strict';

/**
 * Module dependencies
 */
var partyserverPolicy = require('../policies/partyserver.server.policy'),
  partyserver = require('../controllers/partyserver.server.controller');

module.exports = function (app) {
  // Partyserver collection routes
  app.route('/api/partyserver').all(partyserverPolicy.isAllowed)
    .get(partyserver.list)
    .post(partyserver.update);
  // Single partyserver routes
  app.route('/api/partyserver/:partyserverId').all(partyserverPolicy.isAllowed)
    .get(partyserver.read)
    .post(partyserver.update)
    .delete(partyserver.delete);

  // Finish by binding the partyserver middleware
  app.param('partyserverId', partyserver.partyserverByID);
};
