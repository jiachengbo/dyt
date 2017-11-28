'use strict';

/**
 * Module dependencies
 */
var ylcaPolicy = require('../policies/organization.server.policy'),
  ylca = require('../controllers/youthleaguecommitteeactivities.server.controller');

module.exports = function (app) {
  // ylca collection routes
  app.route('/api/ylca').all(ylcaPolicy.isAllowed)
    .get(ylca.list)
    .post(ylca.update);
  // Single ylca routes
  app.route('/api/ylca/:ylcaId').all(ylcaPolicy.isAllowed)
    .get(ylca.read)
    .post(ylca.update)
    .delete(ylca.delete);

  // Finish by binding the ylca middleware
  app.param('ylcaId', ylca.ylcaByID);
};
