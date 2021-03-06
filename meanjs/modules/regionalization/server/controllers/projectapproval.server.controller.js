'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Show the current ProjectTable
 */
exports.read = function (req, res) {
  var ProjectTable = req.model ? req.model.toJSON() : {};
  ProjectTable.isCurrentUserOwner = !!(req.user && ProjectTable.user && ProjectTable.user.id.toString() === req.user.id.toString());
  res.json(ProjectTable);
};

/**
 * Update an ProjectTable
 */
exports.update = function (req, res) {
  var ProjectTable = req.model;
  ProjectTable.approveddepartment = req.body.approveddepartment;
  ProjectTable.approvedstate = req.body.approvedstate;
  ProjectTable.rejectcause = req.body.rejectcause;
  ProjectTable.approvedtime = req.body.approvedtime;
  ProjectTable.state = req.body.state;
  ProjectTable.save().then(function () {
    return ProjectTable.reload()
      .then(function () {
        res.json(ProjectTable);
      });
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
/**
 * ProjectTable middleware
 */
exports.approvalByID = function (req, res, next, id) {
  var ProjectTable = sequelize.model('ProjectTable');

  ProjectTable.findOne({
    where: {projectid: id}
  }).then(function (ProjectTable) {
    if (!ProjectTable) {
      logger.error('No ProjectTable with that identifier has been found');
      return res.status(404).send({
        message: 'No ProjectTable with that identifier has been found'
      });
    }
    req.model = ProjectTable;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('ProjectTable ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
