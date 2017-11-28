'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an InteractionTable
 */
exports.create = function (req, res) {
  var interactionTable = sequelize.model('InteractionTable');
  var InteractionTable = interactionTable.build(req.body);
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  InteractionTable.createdate = new Date();
  InteractionTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return InteractionTable.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(InteractionTable);
      });
  }).catch(function (err) {
    logger.error('InteractionTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current InteractionTable
 */
exports.read = function (req, res) {
  var InteractionTable = req.model ? req.model.toJSON() : {};
  InteractionTable.isCurrentUserOwner = !!(req.user && InteractionTable.user && InteractionTable.user.id.toString() === req.user.id.toString());
  res.json(InteractionTable);
};

/**
 * Update an InteractionTable
 */
exports.update = function (req, res) {
  var InteractionTable = req.model;
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  InteractionTable.problem = req.body.problem;
  InteractionTable.communityid = req.body.communityid;
  InteractionTable.party = req.body.party;
  InteractionTable.save().then(function () {
    return InteractionTable.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ],
      order: 'createdate ASC'
    })
      .then(function () {
        res.json(InteractionTable);
      });
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an InteractionTable
 */
exports.delete = function (req, res) {
  var InteractionTable = req.model;

  InteractionTable.destroy().then(function () {
    res.json(InteractionTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of InteractionTable
 */
exports.list = function (req, res) {
  var InteractionTable = sequelize.model('InteractionTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  InteractionTable.findAll({
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    order: 'createdate ASC'
  }).then(function (InteractionTable) {
    return res.jsonp(InteractionTable);
  }).catch(function (err) {
    logger.error('InteractionTable list error:', err);
    return res.status(422).send(err);
  });
};

/**
 * InteractionTable middleware
 */
exports.interactionByID = function (req, res, next, id) {
  var InteractionTable = sequelize.model('InteractionTable');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  var commId = req.query.communityId;
  var party = req.query.party;
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
    InteractionTable.findOne({
      where: {interactionid: id}
    }).then(function (InteractionTable) {
      if (!InteractionTable) {
        logger.error('No InteractionTable with that identifier has been found');
        return res.status(404).send({
          message: 'No InteractionTable with that identifier has been found'
        });
      }
      req.model = InteractionTable;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('InteractionTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};

//----分页
function listByPage(req, res, limit, offset, party) {
  var InteractionTable = sequelize.model('InteractionTable');
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
      order: 'createdate DESC'
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
      order: 'createdate DESC'
    };
  }
  InteractionTable.findAll(where).then(function (InteractionTable) {
    return res.jsonp(InteractionTable);
  }).catch(function (err) {
    logger.error('InteractionTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from InteractionTable where party = ' + party;
  } else {
    sql = 'select count(*) sum from InteractionTable';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId, party) {
  var InteractionTable = sequelize.model('InteractionTable');
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
  InteractionTable.findAll({
    where: where,
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'createdate DESC'
  }).then(function (InteractionTable) {
    return res.jsonp(InteractionTable);
  }).catch(function (err) {
    logger.error('InteractionTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from InteractionTable where communityid = ' + commId + ' and party = ' + party;
  } else {
    sql = 'select count(*) sum from InteractionTable where communityid = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
