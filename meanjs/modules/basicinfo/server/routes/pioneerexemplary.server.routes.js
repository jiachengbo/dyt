'use strict';

/**
 * Module dependencies
 */
var basicinfoPolicy = require('../policies/basicinfo.server.policy'),
  basicinfo = require('../controllers/pioneerexemplary.server.controller');

module.exports = function (app) {
  // Basicinfo collection routes
  app.route('/api/basic/pioneerexemplaryinfo').all(basicinfoPolicy.isAllowed)
    .get(basicinfo.list)
    .post(basicinfo.create);
  // Single basicinfo routes
  app.route('/api/basic/pioneerexemplaryinfo/:pioneerexemplaryId').all(basicinfoPolicy.isAllowed)
    .get(basicinfo.read)
    .post(basicinfo.update)
    .delete(basicinfo.delete);

  // Finish by binding the basicinfo middleware
  app.param('pioneerexemplaryId', basicinfo.pioneerexemplaryinfoByID);
};
