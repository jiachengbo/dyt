'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an partyBuildInstructorTable
 */
exports.create = function (req, res) {
  var User = sequelize.model('User');
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorTable');
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');
  var partyBuildInstructorTable = PartyBuildInstructorTable.build(req.body);

  partyBuildInstructorTable.user_id = req.user.id;
  partyBuildInstructorTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return partyBuildInstructorTable.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    })
      .then(function () {
        res.json(partyBuildInstructorTable);
      });
  }).catch(function (err) {
    logger.error('partyBuildInstructorTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current partyBuildInstructorTable
 */
exports.read = function (req, res) {
  var partyBuildInstructorTable = req.model ? req.model.toJSON() : {};
  partyBuildInstructorTable.isCurrentUserOwner = !!(req.user && partyBuildInstructorTable.user && partyBuildInstructorTable.user.id.toString() === req.user.id.toString());

  res.json(partyBuildInstructorTable);
};

/**
 * Update an partyBuildInstructorTable
 */
exports.update = function (req, res) {
  var partyBuildInstructorTable = req.model;
  var CommunityVillageConstant = sequelize.model('CommunityVillageConstant');

  partyBuildInstructorTable.name = req.body.name;
  partyBuildInstructorTable.content = req.body.content;
  partyBuildInstructorTable.type_style = req.body.type_style;
  partyBuildInstructorTable.member_number = req.body.member_number;
  partyBuildInstructorTable.mass_organization = req.body.mass_organization;
  partyBuildInstructorTable.business_contact = req.body.business_contact;
  partyBuildInstructorTable.contact_number = req.body.contact_number;
  partyBuildInstructorTable.address = req.body.address;
  partyBuildInstructorTable.build_instructor = req.body.build_instructor;
  partyBuildInstructorTable.instructor_number = req.body.instructor_number;
  partyBuildInstructorTable.communityid = req.body.communityid;
  partyBuildInstructorTable.party = req.body.party;

  partyBuildInstructorTable.save().then(function () {
    return partyBuildInstructorTable.reload({
      include: [
        {
          model: CommunityVillageConstant,
          attributes: ['name']
        }
      ]
    }).then(function () {
      res.json(partyBuildInstructorTable);
    });
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an partyBuildInstructorTable
 */
exports.delete = function (req, res) {
  var partyBuildInstructorTable = req.model;
  partyBuildInstructorTable.destroy().then(function () {
    res.json(partyBuildInstructorTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of PartyBuildInstructorTable
 */
exports.list = function (req, res) {
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorTable');
  PartyBuildInstructorTable.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (partyBuildInstructorTable) {
    return res.jsonp(partyBuildInstructorTable);
  }).catch(function (err) {
    logger.error('partyBuildInstructorTable list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset, party) {
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorTable');
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
  PartyBuildInstructorTable.findAll(where).then(function (partyBuildInstructorTable) {
    return res.jsonp(partyBuildInstructorTable);
  }).catch(function (err) {
    logger.error('PartyBuildInstructorTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from PartyBuildInstructorTable where party = ' + party;
  } else {
    sql = 'select count(*) sum from PartyBuildInstructorTable';
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
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorTable');
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
  PartyBuildInstructorTable.findAll({
    where: where,
    include: [
      {
        model: CommunityVillageConstant,
        attributes: ['name']
      }
    ],
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (partyBuildInstructorTable) {
    return res.jsonp(partyBuildInstructorTable);
  }).catch(function (err) {
    logger.error('PartyBuildInstructorTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId, party) {
  var sql;
  if (party) {
    sql = 'select count(*) sum from PartyBuildInstructorTable where communityid = ' + commId + ' and party = ' + party;
  } else {
    sql = 'select count(*) sum from PartyBuildInstructorTable where communityid = ' + commId + '';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * PartyBuildInstructorTable middleware
 */
exports.partyBuildInstructorTableByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var commId = req.query.communityId;
  var party = req.query.party;
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorTable');
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
    PartyBuildInstructorTable.findOne({
      where: {id: id}
    }).then(function (partyBuildInstructorTable) {
      if (!partyBuildInstructorTable) {
        logger.error('No partyBuildInstructorTable with that identifier has been found');
        return res.status(404).send({
          message: 'No partyBuildInstructorTable with that identifier has been found'
        });
      }

      req.model = partyBuildInstructorTable;
      next();
    }).catch(function (err) {
      logger.error('partyBuildInstructorTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
