'use strict';

/**
 * Module dependencies
 */
var router = require('express').Router(),
  sysparamPolicy = require('../policies/sysparam.server.policy'),
  sysparam = require('../controllers/sysparam.server.controller');


module.exports = function (app) {
  // Sysparam collection routes
  router.route('/').all(sysparamPolicy.isAllowed)
    .get(sysparam.list)
    .post(sysparam.create)
    .put(sysparam.update);

  // Single sysparam routes
  router.route('/:sysparamId').all(sysparamPolicy.isAllowed)
    .get(sysparam.read)
    .delete(sysparam.delete);

  // Finish by binding the sysparam middleware
  router.param('sysparamId', sysparam.sysParamByID);
  app.use('/api/sysparam', router);
};
