'use strict';

/**
 * Module dependencies
 */
var basicinfoPolicy = require('../policies/basicinfo.server.policy'),
  basicinfo = require('../controllers/tradeunionactivities.server.controller');

module.exports = function (app) {
  // Basicinfo collection routes
  app.route('/api/basic/tradeunionactivitiesinfo').all(basicinfoPolicy.isAllowed)
    .get(basicinfo.list)
    .post(basicinfo.update);
  // Single basicinfo routes
  app.route('/api/basic/tradeunionactivitiesinfo/:tradeunionactivitiesinfoId').all(basicinfoPolicy.isAllowed)
    .get(basicinfo.read)
    .post(basicinfo.update)
    .delete(basicinfo.delete);

  // Finish by binding the basicinfo middleware
  app.param('tradeunionactivitiesinfoId', basicinfo.tradeunionactivitiesinfoIdByID);
};
