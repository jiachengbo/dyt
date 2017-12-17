'use strict';

var validator = require('validator'),
  path = require('path'),
  _ = require('lodash'),
  config = require(path.resolve('./config/config')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  dbTools = require(path.resolve('./config/private/dbtools')),
  logger = require(path.resolve('./config/lib/logger')).getLogger_FileNameBase(__filename);

function escape(str) {
  if (typeof(str) !== 'string') {
    return '';
  } else {
    return validator.escape(str);
  }
}
/**
 * Render the main application page
 */
exports.renderIndex = function (req, res) {
  var safeUserObject = null;

  if (req.user) {
    safeUserObject = {
      id: req.user.id,
      displayName: escape(req.user.displayName),
      provider: escape(req.user.provider),
      username: escape(req.user.username),
      createdAt: req.user.createdAt.toString(),
      roles: req.user.roles,
      profileImageURL: req.user.profileImageURL,
      email: escape(req.user.email),
      lastName: escape(req.user.lastName),
      firstName: escape(req.user.firstName),
      additionalProvidersData: req.user.additionalProvidersData
    };
  }

  res.render('modules/core/server/views/index', {
    user: JSON.stringify(safeUserObject),
    sharedConfig: JSON.stringify(config.shared)
  });
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {
  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
exports.getStreetMember = function (req, res) {
  var StreetMemberTable = sequelize.model('StreetMemberTable');
  StreetMemberTable.findAll({
    limit: 8,
    offset: 0,
    order: 'id '
  })
    .then(function (data) {
      return res.jsonp(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.getCommMember = function (req, res) {
  var CommMemberTable = sequelize.model('CommMemberTable');
  CommMemberTable.findAll({
    limit: 8,
    offset: 0,
    order: 'id DESC'
  })
    .then(function (data) {
      return res.jsonp(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.getPartyBuild = function (req, res) {
  var PartyBuildInstructorTable = sequelize.model('PartyBuildInstructorTable');
  PartyBuildInstructorTable.findAll({
    limit: 8,
    offset: 0,
    order: 'id DESC'
  })
    .then(function (data) {
      return res.jsonp(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.getKeyWork = function (req, res) {
  var KeyWorkTable = sequelize.model('KeyWorkTable');
  var where;
  var type = req.query.key;
  var partytype = req.query.type;
  var typeid = req.query.typeid;
  var keyworkid = req.query.keyworkid;
  if (keyworkid) {
    where = {
      keyworkid: keyworkid
    };
  } else {
    if (type !== '两学一做' && partytype) {
      where = {
        type: type,
        partytype: partytype
      };
    } else if (typeid) {
      where = {
        typeId: typeid
      };
    } else {
      where = {
        type: type
      };
    }

  }
  KeyWorkTable.findAll({
    where: where,
    limit: 9,
    offset: 0,
    order: 'keyworkid DESC'
  })
    .then(function (data) {
      return res.jsonp(data);
    })
    .catch(function (err) {
      console.log(err);
    });
};
exports.partymaplist = function (req, res) {
  var sql = '';
  var sql1 = '';
  var arr = [];
  if (req.query.comid === '0') {
    sql = 'SELECT a.* ,b.persontypename FROM mappersontable a,mappersontypetable b where b.persontypeid=a.persontype ';
    sql1 = ' select COUNT(p.personid) as shuliang ,s.persontypename,s.persontypeid from mappersontypetable s left join mappersontable p on (s.persontypeid = p.persontype) GROUP BY s.persontypeid,s.persontypename ';
  } else {
    sql = 'SELECT a.* ,b.persontypename FROM mappersontable a,mappersontypetable b where b.persontypeid=a.persontype and a.communityid =' + req.query.comid;
    sql1 = ' select COUNT(p.personid) as shuliang ,s.persontypename,s.persontypeid from mappersontypetable s left join (select * from mappersontable where mappersontable.communityid = ' + req.query.comid + ') p on (s.persontypeid = p.persontype) GROUP BY s.persontypeid,s.persontypename ';
  }
  sequelize.query(sql1).spread(function (results, metadata) {
    arr = [];
    arr.push(results);
  });
  sequelize.query(sql).spread(function (results, metadata) {
    arr.push(results);
    return res.jsonp(arr);
  });
};
exports.partybuildlist = function (req, res) {
  var sql = '';
  var sql1 = '';
  var arr = [];
  var num = 0;
  if (req.query.count) {
    sql1 = 'SELECT  count(b.progressid) as num  FROM progresstable b where b.projectid =' + req.query.id;
    sequelize.query(sql1).spread(function (results, metadata) {
      return res.jsonp(results);
    });
  } else {
    if (req.query.id) {
      sql = 'SELECT a.*  FROM projecttable a where a.projectid =' + req.query.id + ' limit 0,4';
      sequelize.query(sql).spread(function (results, metadata) {
        arr.push(results);
      });
      if (!req.query.limit) {
        num = 0;
      } else {
        num = req.query.limit;
      }
      sql1 = 'SELECT  b.*  FROM progresstable b where b.projectid =' + req.query.id + ' limit ' + num + ',4';
      sequelize.query(sql1).spread(function (results, metadata) {
        arr.push(results);
        return res.jsonp(arr);
      });
    } else {
      sql = 'SELECT a.*   FROM projecttable a order by a.projectid desc limit 0,5';
      sequelize.query(sql).spread(function (results, metadata) {
        return res.jsonp(results);
      });
    }
  }
};
exports.partyjiaoliu = function (req, res) {
  var selc = 'SELECT a.*  FROM interactiontable a order by a.interactionid desc limit 0,6';
  sequelize.query(selc).spread(function (results, metadata) {
    return res.jsonp(results);
  });
};
exports.community = function (req, res) {
  var selc = 'SELECT a.*  FROM communityvillageconstant a';
  sequelize.query(selc).spread(function (results, metadata) {
    return res.jsonp(results);
  });
};
exports.partyorgmap = function (req, res) {
  var sql = '';
  if (req.query.comid === '0') {
    sql = 'SELECT a.*  FROM partyorganizationtable a ';
  } else {
    sql = 'SELECT a.* FROM partyorganizationtable a where  a.community =' + req.query.comid;
  }
  sequelize.query(sql).spread(function (results, metadata) {
    return res.json(results);
  });
};
exports.partyDTBuild = function (req, res) {
  var sql1 = '';
  var num = 0;
  if (req.query.id) {
    sql1 = 'SELECT  b.* , c.name as communityidname, g.name as gridname FROM dynamictable b left join communityvillageconstant c on b.communityid = c.id left join gridtable g on b.gridid = g.id  where b.dynamicid = ' + req.query.id;
    sequelize.query(sql1).spread(function (results, metadata) {
      return res.jsonp(results);
    });
  } else {
    if (req.query.count) {
      if (req.query.type === '全部') {
        sql1 = 'SELECT  count(b.dynamicid) as num  FROM dynamictable b';
      } else if (req.query.comm) {
        sql1 = 'SELECT  count(b.dynamicid) as num  FROM dynamictable b where  b.communityid = ' + req.query.comm;
      } else {
        sql1 = 'SELECT  count(b.dynamicid) as num  FROM dynamictable b where b.type = \'' + req.query.type + '\'';
      }
      sequelize.query(sql1).spread(function (results, metadata) {
        return res.jsonp(results);
      });
    } else {
      if (req.query.type === '全部') {
        num = req.query.limit;
        sql1 = 'SELECT  b.*  FROM dynamictable b order by b.dynamicid desc limit ' + num + ',8';
      } else if (req.query.comm) {
        num = req.query.limit;
        sql1 = 'SELECT  b.*  FROM dynamictable b where b.communityid =' + req.query.comm + ' order by b.dynamicid desc limit ' + num + ',8';
      } else {
        num = req.query.limit;
        sql1 = 'SELECT  b.*  FROM dynamictable b where b.type =\'' + req.query.type + '\' order by b.dynamicid desc limit ' + num + ',8';
      }
      sequelize.query(sql1).spread(function (results, metadata) {
        return res.jsonp(results);
      });
    }
  }
};
exports.jiedaoDTBuild = function (req, res) {
  var sql = '';
  if (req.query.id) {
    sql = 'SELECT a.*  FROM streetdynamicstable a where a.id = ' + req.query.id;
  } else if (req.query.count) {
    sql = 'select count(*) as count from streetdynamicstable';
  } else if (req.query.page) {
    var page = req.query.page;
    sql = 'SELECT a.*  FROM streetdynamicstable a order by a.id desc limit ' + (page - 1) * 8 + ',8';
  } else {
    sql = 'SELECT a.*  FROM streetdynamicstable a order by a.createdate desc limit 0,8';
  }

  sequelize.query(sql).spread(function (results, metadata) {
    return res.jsonp(results);
  });
};
exports.interFlow = function (req, res) {
  var commId = req.query.commId;
  var text = req.query.text;
  console.log(typeof commId);
  function insert(id, pro) {
    var sql = 'INSERT INTO interactiontable (communityid, problem, createdate) VALUES (' + id + ', \'' + pro + '\',NOW())';
    sequelize.query(sql).spread(function (results, metadata) {
      console.log(results);
      res.jsonp([results]);
    });
  }

  if (typeof commId === 'string') {
    insert(commId, text);
  } else {
    for (var i = 0; i < commId.length; i++) {
      insert(commId[i], text);
    }
  }
};
exports.getTopVoice = function (req, res) {
  var TopVoiceTable = sequelize.model('TopVoiceTable');
  var id = req.query.id;
  var type = req.query.type;
  var page = req.query.page;
  var count = req.query.count;
  if (id) {
    TopVoiceTable.findAll({
      where: {
        id: id
      }
    }).then(function (data) {
      return res.jsonp(data);
    })
      .catch(function (err) {
        console.log(err);
      });
  } else if (count) {
    TopVoiceTable.count({
      where: {
        type: type
      }
    }).then(function (data) {
      var arr = [];
      arr.push(data);
      return res.jsonp(arr);
    })
      .catch(function (err) {
        console.log(err);
      });
  } else if (page) {
    page = (page - 1) * 8;
    TopVoiceTable.findAll({
      where: {
        type: type
      },
      limit: 8,
      offset: page,
      order: 'id DESC'
    }).then(function (data) {
      return res.jsonp(data);
    })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    TopVoiceTable.findAll({
      where: {
        type: type
      },
      limit: 8,
      offset: 0,
      order: 'id DESC'
    }).then(function (data) {
      return res.jsonp(data);
    })
      .catch(function (err) {
        console.log(err);
      });
  }
};
exports.getghmsg = function (req, res) {
  var TradeUnionActivitiesTable = sequelize.model('TradeUnionActivitiesTable');
  var id = req.query.id;
  var type = req.query.type;
  if (id) {
    TradeUnionActivitiesTable.findAll({
      where: {
        id: id
      }
    }).then(function (data) {
      return res.jsonp(data);
    })
      .catch(function (err) {
        console.log(err);
      });
  } else {
    TradeUnionActivitiesTable.findAll({
      where: {
        type: type
      },
      limit: 8,
      offset: 0,
      order: 'id DESC'
    }).then(function (data) {
      return res.jsonp(data);
    })
      .catch(function (err) {
        console.log(err);
      });
  }
};
exports.gettwmsg = function (req, res) {
  var YLC_activitiesTable = sequelize.model('YLC_activitiesTable');
  var YLC_activitiesTypeTable = sequelize.model('YLC_activitiesTypeTable');
  var activitiestypeid = req.query.activitiestypeid;
  var id = req.query.id;
  var where;
  if (activitiestypeid) {
    where = {
      activitiestype: activitiestypeid
    };
  } else {
    where = {
      id: id
    };
  }
  YLC_activitiesTable.findAll({
    where: where,
    limit: 10,
    offset: 0,
    order: 'id DESC'
  }).then(function (data) {
    return res.jsonp(data);
  }).catch(function (err) {
    return err;
  });
};

exports.studybuild = function (req, res) {
  var sql = '';
  if (req.query.id) {
    sql = 'SELECT a.*  FROM LearningDynamicsTable a where a.id = ' + req.query.id;
  } else {
    sql = 'SELECT a.*  FROM LearningDynamicsTable a order by a.id desc limit 0,7';
  }
  sequelize.query(sql).spread(function (results, metadata) {
    return res.jsonp(results);
  });
};

exports.xianfebuild = function (req, res) {
  var sql = '';
  if (req.query.type) {
    sql = 'SELECT a.*  FROM pioneerexemplarytable a where a.type = \'' + req.query.type + '\' order by a.id desc limit 0,8';
  } else {
    sql = 'SELECT a.*  FROM pioneerexemplarytable a order by a.id desc limit 0,8';
  }
  sequelize.query(sql).spread(function (results, metadata) {
    return res.jsonp(results);
  });
};
exports.getflmsg = function (req, res) {
  var WomenInformationManagement = sequelize.model('WomenInformationManagement');
  var typeid = req.query.typeid;
  var id = req.query.id;
  var limit = req.query.limit;
  var where;
  if (id) {
    where = {
      id: id
    };
  } else {
    where = {
      type: typeid
    };
  }
  WomenInformationManagement.findAll({
    where: where,
    limit: Number(limit),
    offset: 0,
    order: 'id DESC'
  }).then(function (data) {
    return res.jsonp(data);
  }).catch(function (err) {
    return res.err.message;
  });
};
exports.joinus = function (req, res) {
  var VolunteerTeamTable = sequelize.model('VolunteerTeamTable');
  var name = req.query.name;
  var sex = req.query.sex;
  var address = req.query.address;
  var phone = req.query.phone;
  var reason = req.query.reason;
  var time = req.query.time;
  VolunteerTeamTable.create({
    name: name,
    sex: sex,
    address: address,
    tel: phone,
    reasonsforjoining: reason,
    createdate: time
  }).then(function () {
    console.log('插入成功！');
  }).catch(function () {
    console.log('插入出错了');
  });
};
exports.weiquan = function (req, res) {
  var GuardianMailboxTable = sequelize.model('GuardianMailboxTable');
  var name = req.query.name;
  var sex = req.query.sex;
  var address = req.query.address;
  var phone = req.query.phone;
  var email = req.query.email;
  var zhuti = req.query.zhuti;
  var content = req.query.content;
  var time = req.query.time;
  GuardianMailboxTable.create({
    name: name,
    sex: sex,
    address: address,
    tel: phone,
    email: email,
    title: zhuti,
    content: content,
    createdate: time
  }).then(function () {
    console.log('插入成功！');
  }).catch(function () {
    console.log('插入出错了');
  });
};
