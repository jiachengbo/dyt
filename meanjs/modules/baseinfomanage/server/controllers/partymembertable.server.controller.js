'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an partyMemberTable
 */
exports.create = function (req, res) {
  var PartyMemberTable = sequelize.model('PartyMemberTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var partyMemberTable = PartyMemberTable.build(req.body);

  partyMemberTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return partyMemberTable.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(partyMemberTable);
      });
  }).catch(function (err) {
    logger.error('partyMemberTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current partyMemberTable
 */
exports.read = function (req, res) {
  var partyMemberTable = req.model ? req.model.toJSON() : {};
  partyMemberTable.isCurrentUserOwner = !!(req.user && partyMemberTable.user && partyMemberTable.user.id.toString() === req.user.id.toString());

  res.json(partyMemberTable);
};

/**
 * Update an partyMemberTable
 */
exports.update = function (req, res) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var partyMemberTable = req.model;

  partyMemberTable.name = req.body.name;
  partyMemberTable.sex = req.body.sex;
  partyMemberTable.nation = req.body.nation;
  partyMemberTable.work_unit = req.body.work_unit;
  partyMemberTable.birthday = req.body.birthday;
  partyMemberTable.nation_place = req.body.nation_place;
  partyMemberTable.id_card = req.body.id_card;
  partyMemberTable.phone = req.body.phone;
  partyMemberTable.join_time = req.body.join_time;
  partyMemberTable.party_type = req.body.party_type;
  partyMemberTable.is_lost = req.body.is_lost;
  partyMemberTable.lost_time = req.body.lost_time;
  partyMemberTable.is_float = req.body.is_float;
  partyMemberTable.float_trend = req.body.float_trend;
  partyMemberTable.community = req.body.community;
  partyMemberTable.party_branch = req.body.party_branch;
  partyMemberTable.conversion_time = req.body.conversion_time;
  partyMemberTable.party_state = req.body.party_state;
  partyMemberTable.remark = req.body.remark;
  partyMemberTable.partytype = req.body.partytype;

  partyMemberTable.save().then(function () {
    return partyMemberTable.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(partyMemberTable);
      });
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an partyMemberTable
 */
exports.delete = function (req, res) {
  var partyMemberTable = req.model;

  partyMemberTable.destroy().then(function () {
    res.json(partyMemberTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of PartyMemberTable
 */
exports.list = function (req, res) {
  var PartyMemberTable = sequelize.model('PartyMemberTable');
  PartyMemberTable.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (partyMemberTable) {
    return res.jsonp(partyMemberTable);
  }).catch(function (err) {
    logger.error('partyMemberTable list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset, partytype, id_card) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var PartyMemberTable = sequelize.model('PartyMemberTable');
  var where;
  if (partytype) {
    where = {
      where: {
        partytype: partytype
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
    if (id_card) {
      where = {
        where: {
          id_card: id_card
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
  }
  PartyMemberTable.findAll(where).then(function (partyMemberTable) {
    return res.jsonp(partyMemberTable);
  }).catch(function (err) {
    logger.error('PartyMemberTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, partytype, id_card) {
  var sql;
  if (partytype) {
    sql = 'select count(*) sum from PartyMemberTable where partytype = ' + partytype;
  } else {
    if (id_card) {
      sql = 'select count(*) sum from PartyMemberTable where id_card = ' + id_card;
    } else {
      sql = 'select count(*) sum from PartyMemberTable';
    }
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId, partytype, id_card) {
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var PartyMemberTable = sequelize.model('PartyMemberTable');
  var where;
  if (partytype) {
    where = {
      community: commId,
      partytype: partytype
    };
  } else {
    where = {
      community: commId
    };
  }
  PartyMemberTable.findAll({
    where: where,
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (partyMemberTable) {
    return res.jsonp(partyMemberTable);
  }).catch(function (err) {
    logger.error('PartyMemberTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId, partytype, id_card) {
  var sql;
  if (partytype) {
    sql = 'select count(*) sum from PartyMemberTable where community = ' + commId + ' and partytype = ' + partytype;
  } else {
    sql = 'select count(*) sum from PartyMemberTable where community = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * PartyMemberTable middleware
 */
exports.partyMemberTableByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var commId = req.query.communityId;
  var id_card = req.query.id_card;
  var partytype = req.query.partytype;
  var PartyMemberTable = sequelize.model('PartyMemberTable');
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      // if (partytype) {
      listByPage_comm(req, res, limit, offset, parseInt(commId, 0), partytype, id_card);
      // } else {
      //   listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
      // }
    } else {
      //if (partytype) {
      listByPage(req, res, limit, offset, partytype, id_card);
      // } else {
      //   listByPage(req, res, limit, offset);
      // }
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      //if (partytype) {
      listCount_comm(req, res, parseInt(commId, 0), partytype, id_card);
      // } else {
      //   listCount_comm(req, res, parseInt(commId, 0));
      // }
    } else {
      // if (partytype) {
      listCount(req, res, partytype, id_card);
      // } else {
      //   listCount(req, res);
      // }
    }
  } else if (id !== '0') {
    PartyMemberTable.findOne({
      where: {id: id}
    }).then(function (partyMemberTable) {
      if (!partyMemberTable) {
        logger.error('No partyMemberTable with that identifier has been found');
        return res.status(404).send({
          message: 'No partyMemberTable with that identifier has been found'
        });
      }

      req.model = partyMemberTable;
      next();
    }).catch(function (err) {
      logger.error('partyMemberTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
