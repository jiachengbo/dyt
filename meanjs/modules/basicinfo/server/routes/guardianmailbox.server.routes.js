'use strict';

/**
 * Module dependencies
 */
var basicinfoPolicy = require('../policies/basicinfo.server.policy'),
  basicinfo = require('../controllers/guardianmailbox.server.controller');

module.exports = function (app) {
  // Basicinfo collection routes
  app.route('/api/basic/guardianmailboxinfo').all(basicinfoPolicy.isAllowed)
    .get(basicinfo.list)
    .post(basicinfo.create);
  // Single basicinfo routes
  app.route('/api/basic/guardianmailboxinfo/:guardianmailboxinfoId').all(basicinfoPolicy.isAllowed)
    .get(basicinfo.read)
    .put(basicinfo.update)
    .delete(basicinfo.delete);

  // Finish by binding the basicinfo middleware
  app.param('guardianmailboxinfoId', basicinfo.guardianmailboxinfoByID);
};
