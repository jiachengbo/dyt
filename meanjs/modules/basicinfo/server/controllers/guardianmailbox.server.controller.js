'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an GuardianMailboxTable
 */
exports.create = function (req, res) {
  var guardianMailboxTable = sequelize.model('GuardianMailboxTable');
  var GuardianMailboxTable = guardianMailboxTable.build(req.body);
  GuardianMailboxTable.createdate = new Date();

  GuardianMailboxTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return GuardianMailboxTable.reload()
      .then(function () {
        res.json(GuardianMailboxTable);
      });
  }).catch(function (err) {
    logger.error('GuardianMailboxTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current GuardianMailboxTable
 */
exports.read = function (req, res) {
  var GuardianMailboxTable = req.model ? req.model.toJSON() : {};

  //GuardianMailboxTable.isCurrentUserOwner = !!(req.user && GuardianMailboxTable.user && GuardianMailboxTable.user._id.toString() === req.user._id.toString());
  GuardianMailboxTable.isCurrentUserOwner = !!(req.user && GuardianMailboxTable.user && GuardianMailboxTable.user.id.toString() === req.user.id.toString());

  res.json(GuardianMailboxTable);
};

/**
 * Update an GuardianMailboxTable
 */
exports.update = function (req, res) {
  var GuardianMailboxTable = req.model;

  GuardianMailboxTable.name = req.body.name;
  GuardianMailboxTable.sex = req.body.sex;
  GuardianMailboxTable.birthday = req.body.birthday;
  GuardianMailboxTable.address = req.body.address;
  GuardianMailboxTable.tel = req.body.tel;
  GuardianMailboxTable.email = req.body.email;
  GuardianMailboxTable.title = req.body.title;
  GuardianMailboxTable.content = req.body.content;
  GuardianMailboxTable.save().then(function () {
    res.json(GuardianMailboxTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an GuardianMailboxTable
 */
exports.delete = function (req, res) {
  var GuardianMailboxTable = req.model;

  GuardianMailboxTable.destroy().then(function () {
    res.json(GuardianMailboxTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of GuardianMailboxTable
 */
exports.list = function (req, res) {
  var GuardianMailboxTable = sequelize.model('GuardianMailboxTable');

  GuardianMailboxTable.findAll({
    order: 'createdate DESC'
  }).then(function (GuardianMailboxTable) {
    return res.jsonp(GuardianMailboxTable);
  }).catch(function (err) {
    logger.error('GuardianMailboxTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * GuardianMailboxTable middleware
 */
exports.guardianmailboxinfoByID = function (req, res, next, id) {
  var GuardianMailboxTable = sequelize.model('GuardianMailboxTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    GuardianMailboxTable.findOne({
      where: {id: id}
    }).then(function (GuardianMailboxTable) {
      if (!GuardianMailboxTable) {
        logger.error('No GuardianMailboxTable with that identifier has been found');
        return res.status(404).send({
          message: 'No GuardianMailboxTable with that identifier has been found'
        });
      }

      req.model = GuardianMailboxTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('GuardianMailboxTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
//----分页
function listByPage(req, res, limit, offset) {
  var GuardianMailboxTable = sequelize.model('GuardianMailboxTable');
  GuardianMailboxTable.findAll({
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (DynamicTable) {
    return res.jsonp(DynamicTable);
  }).catch(function (err) {
    logger.error('GuardianMailboxTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from GuardianMailboxTable';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
