'use strict';

/**
 * Module dependencies
 */
var mapPolicy = require('../policies/map.server.policy'),
  map = require('../controllers/map.server.controller');

module.exports = function (app) {
  // Map collection routes
  app.route('/api/map/person').all(mapPolicy.isAllowed)
    .get(map.list)
    .post(map.create);
  // Single map routes
  app.route('/api/map/person/:personId').all(mapPolicy.isAllowed)
    .get(map.read)
    .post(map.update)
    .delete(map.delete);

  // Finish by binding the map middleware
  app.param('personId', map.mapPersonByID);
  //获取民情地图人员类型信息
  app.route('/api/map/personType').all(mapPolicy.isAllowed)
    .get(map.personTypeList);

};
