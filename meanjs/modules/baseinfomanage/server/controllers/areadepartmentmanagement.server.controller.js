'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an areadepartmentmanagement
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var Areadepartmentmanagement = sequelize.model('AreaDepartmentManagement');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var areadepartmentmanagement = Areadepartmentmanagement.build(req.body);

  areadepartmentmanagement.user_id = req.user.id;
  areadepartmentmanagement.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return areadepartmentmanagement.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(areadepartmentmanagement);
      });
  }).catch(function (err) {
    logger.error('areadepartmentmanagement create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current areadepartmentmanagement
 */
exports.read = function (req, res) {
  var areadepartmentmanagement = req.model ? req.model.toJSON() : {};
  areadepartmentmanagement.isCurrentUserOwner = !!(req.user && areadepartmentmanagement.user && areadepartmentmanagement.user.id.toString() === req.user.id.toString());

  res.json(areadepartmentmanagement);
};

/**
 * Update an areadepartmentmanagement
 */
exports.update = function (req, res) {
  var areadepartmentmanagement = req.model;
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  areadepartmentmanagement.communityid = req.body.communityid;
  areadepartmentmanagement.tel = req.body.tel;
  areadepartmentmanagement.fzr = req.body.fzr;
  areadepartmentmanagement.leader = req.body.leader;
  areadepartmentmanagement.chief = req.body.chief;
  areadepartmentmanagement.party = req.body.party;
  areadepartmentmanagement.save().then(function () {
    return areadepartmentmanagement.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(areadepartmentmanagement);
      });
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an areadepartmentmanagement
 */
exports.delete = function (req, res) {
  var areadepartmentmanagement = req.model;

  areadepartmentmanagement.destroy().then(function () {
    res.json(areadepartmentmanagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of Areadepartmentmanagement
 */
exports.list = function (req, res) {
  var Areadepartmentmanagement = sequelize.model('AreaDepartmentManagement');

  Areadepartmentmanagement.findAll({
    limit: [0, 20],
    order: 'id asc'
  }).then(function (areadepartmentmanagement) {
    return res.jsonp(areadepartmentmanagement);
  }).catch(function (err) {
    logger.error('areadepartmentmanagement list error:', err);
    return res.status(422).send(err);
  });
};
//---------mysql-分页------------
function listByPage(req, res, limit, offset, party) {
  var AreaDepartmentManagement = sequelize.model('AreaDepartmentManagement');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var where;
  if (party) {
    where = {
      where: {
        party: party
      },
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'id ASC'
    };
  } else {
    where = {
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      limit: [limit, offset],
      order: 'id ASC'
    };
  }
  AreaDepartmentManagement.findAll(where).then(function (areaDepartmentManagement) {
    return res.jsonp(areaDepartmentManagement);
  }).catch(function (err) {
    logger.error('areaDepartmentManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数------------
function listCount(req, res, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from AreaDepartmentManagement where party = ' + party;
  } else {
    sql = 'select count(*) sum from AreaDepartmentManagement';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//---------mysql-分页------------
function listByPage_comm(req, res, limit, offset, commId, party) {
  var AreaDepartmentManagement = sequelize.model('AreaDepartmentManagement');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var where;
  if (party) {
    where = {
      communityid: commId,
      party: party
    };
  } else {
    where = {
      communityid: commId
    };
  }
  AreaDepartmentManagement.findAll({
    where: where,
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (areaDepartmentManagement) {
    return res.jsonp(areaDepartmentManagement);
  }).catch(function (err) {
    logger.error('areaDepartmentManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数------------
function listCount_comm(req, res, commId, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from AreaDepartmentManagement where communityid = ' + commId + ' and party = ' + party;
  } else {
    sql = 'select count(*) sum from AreaDepartmentManagement where communityid = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * Areadepartmentmanagement middleware
 */
exports.areadepartmentmanagementByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var commId = req.query.communityId;
  var party = req.query.party;
  var Areadepartmentmanagement = sequelize.model('AreaDepartmentManagement');
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      if (party) {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0), party);
      } else {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
      }
    } else {
      if (party) {
        listByPage(req, res, limit, offset, party);
      } else {
        listByPage(req, res, limit, offset);
      }
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      if (party) {
        listCount_comm(req, res, parseInt(commId, 0), party);
      } else {
        listCount_comm(req, res, parseInt(commId, 0));
      }
    } else {
      if (party) {
        listCount(req, res, party);
      } else {
        listCount(req, res);
      }
    }
  } else if (id !== '0') {
    Areadepartmentmanagement.findOne({
      where: {id: id}
    }).then(function (areadepartmentmanagement) {
      if (!areadepartmentmanagement) {
        logger.error('No areadepartmentmanagement with that identifier has been found');
        return res.status(404).send({
          message: 'No areadepartmentmanagement with that identifier has been found'
        });
      }

      req.model = areadepartmentmanagement;
      next();
    }).catch(function (err) {
      logger.error('areadepartmentmanagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
