'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an threeMasterMemberManagement
 */
exports.create = function (req, res) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var ThreeMasterMemberManagement = sequelize.model('ThreeMasterMemberManagement');
  var threeMasterMemberManagement = ThreeMasterMemberManagement.build(req.body);

  threeMasterMemberManagement.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return threeMasterMemberManagement.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(threeMasterMemberManagement);
      });
  }).catch(function (err) {
    logger.error('threeMasterMemberManagement create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current threeMasterMemberManagement
 */
exports.read = function (req, res) {
  var threeMasterMemberManagement = req.model ? req.model.toJSON() : {};

  threeMasterMemberManagement.isCurrentUserOwner = !!(req.user && threeMasterMemberManagement.user && threeMasterMemberManagement.user.id.toString() === req.user.id.toString());

  res.json(threeMasterMemberManagement);
};

/**
 * Update an threeMasterMemberManagement
 */
exports.update = function (req, res) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var threeMasterMemberManagement = req.model;
  threeMasterMemberManagement.name = req.body.name;
  threeMasterMemberManagement.sex = req.body.sex;
  threeMasterMemberManagement.birth_date = req.body.birth_date;
  threeMasterMemberManagement.nation = req.body.nation;
  threeMasterMemberManagement.education_degree = req.body.education_degree;
  threeMasterMemberManagement.work_unit = req.body.work_unit;
  threeMasterMemberManagement.type_style = req.body.type_style;
  threeMasterMemberManagement.home_address = req.body.home_address;
  threeMasterMemberManagement.contact_information = req.body.contact_information;
  threeMasterMemberManagement.community = req.body.community;
  threeMasterMemberManagement.grid = req.body.grid;

  threeMasterMemberManagement.save().then(function () {
    return threeMasterMemberManagement.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(threeMasterMemberManagement);
      });
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an threeMasterMemberManagement
 */
exports.delete = function (req, res) {
  var threeMasterMemberManagement = req.model;

  threeMasterMemberManagement.destroy().then(function () {
    res.json(threeMasterMemberManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of ThreeMasterMemberManagement
 */
exports.list = function (req, res) {
  var ThreeMasterMemberManagement = sequelize.model('ThreeMasterMemberManagement');

  ThreeMasterMemberManagement.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (threeMasterMemberManagement) {
    return res.jsonp(threeMasterMemberManagement);
  }).catch(function (err) {
    logger.error('threeMasterMemberManagement list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset) {
  var ThreeMasterMemberManagement = sequelize.model('ThreeMasterMemberManagement');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  ThreeMasterMemberManagement.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (listTable) {
    return res.jsonp(listTable);
  }).catch(function (err) {
    logger.error('ThreeMasterMemberManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from ThreeMasterMemberManagement';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId) {
  var ThreeMasterMemberManagement = sequelize.model('ThreeMasterMemberManagement');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  ThreeMasterMemberManagement.findAll({
    where: {community: commId},
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (listTable) {
    return res.jsonp(listTable);
  }).catch(function (err) {
    logger.error('ThreeMasterMemberManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId) {
  var sql = 'select count(*) sum from ThreeMasterMemberManagement where community = ' + commId + '';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}

/**
 * ThreeMasterMemberManagement middleware
 */
exports.threeMasterMemberManagementByID = function (req, res, next, id) {
  var ThreeMasterMemberManagement = sequelize.model('ThreeMasterMemberManagement');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
    } else {
      listByPage(req, res, limit, offset);
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      listCount_comm(req, res, parseInt(commId, 0));
    } else {
      listCount(req, res);
    }
  } else if (id !== '0') {
    ThreeMasterMemberManagement.findOne({
      where: {id: id}
    }).then(function (threeMasterMemberManagement) {
      if (!threeMasterMemberManagement) {
        logger.error('No threeMasterMemberManagement with that identifier has been found');
        return res.status(404).send({
          message: 'No threeMasterMemberManagement with that identifier has been found'
        });
      }

      req.model = threeMasterMemberManagement;
      next();
    }).catch(function (err) {
      logger.error('threeMasterMemberManagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
