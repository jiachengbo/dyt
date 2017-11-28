'use strict';

var path = require('path'),
  config = require(path.resolve('./config/config'));

module.exports = function (app) {
  // Root routing
  var core = require('../controllers/core.server.controller');

  // Define error pages
  app.route('/server-error').get(core.renderServerError);
  app.route('/api/streetmember').get(core.getStreetMember);
  app.route('/api/commmember').get(core.getCommMember);
  app.route('/api/keywork').get(core.getKeyWork);
  app.route('/api/partymaplist').get(core.partymaplist);
  app.route('/api/partybuildlist').get(core.partybuildlist);
  app.route('/api/partyjiaoliu').get(core.partyjiaoliu);
  app.route('/api/community').get(core.community);
  app.route('/api/partyorgmap').get(core.partyorgmap);
  app.route('/api/partybuild').get(core.getPartyBuild);
  app.route('/api/partyDT').get(core.partyDTBuild);
  app.route('/api/jiedaoDT').get(core.jiedaoDTBuild);
  app.route('/api/interFlow').get(core.interFlow);
  app.route('/api/topvoice').get(core.getTopVoice);
  app.route('/api/ghmsg').get(core.getghmsg);
  app.route('/api/twmsg').get(core.gettwmsg);
  app.route('/api/flmsg').get(core.getflmsg);
  app.route('/api/studyDT').get(core.studybuild);
  app.route('/api/xianfemofan').get(core.xianfebuild);
  app.route('/api/joinus').get(core.joinus);
  app.route('/api/weiquan').get(core.weiquan);
  // Return a 404 for all undefined api, module or lib routes
  var paths = ['api', 'modules', 'lib'];
  if (config.uploads) {
    paths.push(config.uploads.rootMountDir.replace(/^\//, ''));
  }
  if (config.map) {
    paths.push(config.map.rootMountDir.replace(/^\//, ''));
  }

  app.route('/:url(' + paths.join('|') + '|)/*').get(core.renderNotFound);

  // Define application route
  app.route('/*').get(core.renderIndex);
};
