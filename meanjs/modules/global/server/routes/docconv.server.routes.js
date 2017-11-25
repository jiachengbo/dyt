'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  router = require('express').Router(),
  config = require(path.resolve('./config/config')),
  docConvPolicy = require('../policies/docconv.server.policy'),
  docConvs = require('../controllers/docconv.server.controller'),
  logger = require(path.resolve('./config/lib/logger'));

module.exports = function (app) {
  if (config.sofficePathName) {
    if (!fs.existsSync(config.sofficePathName)) {
      logger.error('soffice file pathname %s not exists', config.sofficePathName);
      return;
    }

    // Articles collection routes
    router.route('/:docfile').all(docConvPolicy.isAllowed)
      .get(docConvs.read);

    // Finish by binding the article middleware
    router.param('docfile', docConvs.docfile);

    app.use('/api/docconv', router);
  }
};
