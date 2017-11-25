'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

/**
 * Create an partyOrganizationTable
 */
exports.create = function (req, res) {
  var PartyOrganizationTable = sequelize.model('PartyOrganizationTable');
  var partyOrganizationTable = PartyOrganizationTable.build(req.body);
  partyOrganizationTable.save().then(function () {
    //重新加载数据，使数据含有关联表的内容
    return partyOrganizationTable.reload()
      .then(function () {
        res.json(partyOrganizationTable);
      });
  }).catch(function (err) {
    logger.error('partyOrganizationTable create error:', err);
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current partyOrganizationTable
 */
exports.read = function (req, res) {
  var partyOrganizationTable = req.model ? req.model.toJSON() : {};
  partyOrganizationTable.isCurrentUserOwner = !!(req.user && partyOrganizationTable.user && partyOrganizationTable.user.id.toString() === req.user.id.toString());

  res.json(partyOrganizationTable);
};

/**
 * Update an partyOrganizationTable
 */
exports.update = function (req, res) {
  var partyOrganizationTable = req.model;

  partyOrganizationTable.name = req.body.name;
  partyOrganizationTable.established_time = req.body.established_time;
  partyOrganizationTable.party_organization = req.body.party_organization;
  partyOrganizationTable.general_branch = req.body.general_branch;
  partyOrganizationTable.member_ship = req.body.member_ship;
  partyOrganizationTable.secretary = req.body.secretary;
  partyOrganizationTable.party_zhuangan = req.body.party_zhuangan;
  partyOrganizationTable.concat_phone = req.body.concat_phone;
  partyOrganizationTable.concat_address = req.body.concat_address;
  partyOrganizationTable.party_number = req.body.party_number;
  partyOrganizationTable.company_type = req.body.company_type;
  partyOrganizationTable.community = req.body.community;
  partyOrganizationTable.longitude = req.body.longitude;
  partyOrganizationTable.latitude = req.body.latitude;
  partyOrganizationTable.condition_type = req.body.condition_type;
  partyOrganizationTable.company_condition = req.body.company_condition;
  partyOrganizationTable.company_name = req.body.company_name;
  partyOrganizationTable.organize_condition = req.body.organize_condition;
  partyOrganizationTable.code = req.body.code;

  partyOrganizationTable.save().then(function () {
    res.json(partyOrganizationTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Delete an partyOrganizationTable
 */
exports.delete = function (req, res) {
  var partyOrganizationTable = req.model;

  partyOrganizationTable.destroy().then(function () {
    res.json(partyOrganizationTable);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of PartyOrganizationTable
 */
exports.list = function (req, res) {
  var PartyOrganizationTable = sequelize.model('PartyOrganizationTable');
  var obj;
  if (req.query.type) {
    obj = {
      where: {
        company_type: req.query.type
      },
      limit: [0, 20],
      order: 'id ASC'
    };
  } else {
    obj = {
      limit: [0, 20],
      order: 'id ASC'
    };
  }
  PartyOrganizationTable.findAll(obj).then(function (partyOrganizationTable) {
    return res.jsonp(partyOrganizationTable);
  }).catch(function (err) {
    logger.error('partyOrganizationTable list error:', err);
    return res.status(422).send(err);
  });
};
//----分页
function listByPage(req, res, limit, offset, type) {
  var PartyOrganizationTable = sequelize.model('PartyOrganizationTable');
  var obj1;
  if (type) {
    obj1 = {
      where: {
        company_type: type
      },
      limit: [limit, offset],
      order: 'id ASC'
    };
  } else {
    obj1 = {
      limit: [limit, offset],
      order: 'id ASC'
    };
  }
  PartyOrganizationTable.findAll(obj1).then(function (partyOrganizationTable) {
    return res.jsonp(partyOrganizationTable);
  }).catch(function (err) {
    logger.error('PartyOrganizationTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res, type) {
  var sql;
  if (type) {
    sql = 'select count(*) sum from PartyOrganizationTable where company_type = ' + type;
  } else {
    sql = 'select count(*) sum from PartyOrganizationTable';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
//----分页
function listByPage_comm(req, res, limit, offset, commId, type) {
  var PartyOrganizationTable = sequelize.model('PartyOrganizationTable');
  var where;
  if (type) {
    where = {
      community: commId,
      company_type: type
    };
  } else {
    where = {
      community: commId
    };
  }
  PartyOrganizationTable.findAll({
    where: where,
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (partyOrganizationTable) {
    return res.jsonp(partyOrganizationTable);
  }).catch(function (err) {
    logger.error('PartyOrganizationTable list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount_comm(req, res, commId, type) {
  var sql;
  if (type) {
    sql = 'select count(*) sum from PartyOrganizationTable where community = ' + commId + ' and company_type = ' + type;
  } else {
    sql = 'select count(*) sum from PartyOrganizationTable where community = ' + commId + ' ';
  }
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}
/**
 * PartyOrganizationTable middleware
 */
exports.partyOrganizationTableByID = function (req, res, next, id) {
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*10
  var offset = parseInt(req.query.offset, 0);//10 每页总数
  var commId = req.query.communityId;
  var type = req.query.type;
  var PartyOrganizationTable = sequelize.model('PartyOrganizationTable');
  if (offset !== 0 && id === '0') {
    if (commId !== '') {
      if (type) {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0), type);
      } else {
        listByPage_comm(req, res, limit, offset, parseInt(commId, 0));
      }

    } else {
      if (type) {
        listByPage(req, res, limit, offset, type);
      } else {
        listByPage(req, res, limit, offset);
      }
    }
  } else if (limit === 0 && offset === 0 && id === '0') {
    if (commId !== '') {
      if (type) {
        listCount_comm(req, res, parseInt(commId, 0), type);
      } else {
        listCount_comm(req, res, parseInt(commId, 0));
      }
    } else {
      if (type) {
        listCount(req, res, type);
      } else {
        listCount(req, res);
      }
    }
  } else if (id !== '0') {
    PartyOrganizationTable.findOne({
      where: {id: id}
    }).then(function (partyOrganizationTable) {
      if (!partyOrganizationTable) {
        logger.error('No partyOrganizationTable with that identifier has been found');
        return res.status(404).send({
          message: 'No partyOrganizationTable with that identifier has been found'
        });
      }

      req.model = partyOrganizationTable;
      next();
    }).catch(function (err) {
      logger.error('partyOrganizationTable ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
exports.partyfuwulist = function (req, res) {
  var PartyOrganizationTable = sequelize.model('PartyOrganizationTable');
  PartyOrganizationTable.findAll({
    order: 'id ASC'
  }).then(function (partyOrganizationTable) {
    return res.jsonp(partyOrganizationTable);
  }).catch(function (err) {
    logger.error('partyOrganizationTable list error:', err);
    return res.status(422).send(err);
  });
};
