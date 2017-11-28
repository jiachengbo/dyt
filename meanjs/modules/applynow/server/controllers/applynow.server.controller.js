'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an applyNow
 */
exports.create = function (req, res) {
  var ApplyNow = sequelize.model('ApplyNow');
  var applyNow = ApplyNow.build(req.body);

  applyNow.save().then(function () {
    return applyNow.reload({
    })
    .then(function() {
      res.json(applyNow);
    });
  }).catch(function (err) {
    logger.error('applyNow create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current applyNow
 */
exports.read = function (req, res) {
  var applyNow = req.model ? req.model.toJSON() : {};

  //applyNow.isCurrentUserOwner = !!(req.user && applyNow.user && applyNow.user._id.toString() === req.user._id.toString());
  applyNow.isCurrentUserOwner = !!(req.user && applyNow.user && applyNow.user.id.toString() === req.user.id.toString());

  res.json(applyNow);
};

/**
 * Update an applyNow
 */
exports.update = function (req, res) {
  var applyNow = req.model;
  applyNow.name = req.body.name;
  applyNow.gender = req.body.gender;
  applyNow.phoneNumber = req.body.phoneNumber;
  applyNow.idcard = req.body.idcard;
  applyNow.zhibu = req.body.zhibu;
  applyNow.mingzu = req.body.mingzu;
  applyNow.partytime = req.body.partytime;
  applyNow.brith = req.body.brith;
  applyNow.danwei = req.body.danwei;
  applyNow.adress = req.body.adress;
  applyNow.partymoney = req.body.partymoney;
  applyNow.jiguan = req.body.jiguan;
  applyNow.zhuangtai = req.body.zhuangtai;
  applyNow.save().then(function () {
    res.json(applyNow);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an applyNow
 */
exports.delete = function (req, res) {
  var applyNow = req.model;

  applyNow.destroy().then(function () {
    res.json(applyNow);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of ApplyNow
 */
exports.list = function (req, res) {
  var ApplyNow = sequelize.model('ApplyNow');
  ApplyNow.findAll({
  }).then(function (applyNow) {
    return res.jsonp(applyNow);
  }).catch(function (err) {
    logger.error('applyNow list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * ApplyNow middleware
 */
exports.applyNowByID = function (req, res, next, id) {
  var ApplyNow = sequelize.model('ApplyNow');
  ApplyNow.findOne({
    where: {id: id}
  }).then(function (applyNow) {
    if (!applyNow) {
      logger.error('No applyNow with that identifier has been found');
      return res.status(404).send({
        message: 'No applyNow with that identifier has been found'
      });
    }

    req.model = applyNow;
    next();
  }).catch(function (err) {
    //return next(err);
    logger.error('applyNow ByID error:', err);
    res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};
