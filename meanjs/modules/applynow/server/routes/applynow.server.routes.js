'use strict';

/**
 * Module dependencies
 */
var applyNowPolicy = require('../policies/applyNow.server.policy'),
  applyNow = require('../controllers/applyNow.server.controller');

module.exports = function (app) {
  // ApplyNow collection routes
  app.route('/api/applyNow').all(applyNowPolicy.isAllowed)
    .get(applyNow.list)
    .post(applyNow.create);
  // Single applyNow routes
  app.route('/api/applyNow/:applyNowId').all(applyNowPolicy.isAllowed)
    .get(applyNow.read)
    .put(applyNow.update)
    .delete(applyNow.delete);

  // Finish by binding the applyNow middleware
  app.param('applyNowId', applyNow.applyNowByID);
};
