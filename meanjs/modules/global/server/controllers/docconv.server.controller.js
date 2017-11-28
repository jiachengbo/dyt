'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  fs = require('fs'),
  util = require('util'),
  child_process = require('child_process'),
  config = require(path.resolve('./config/config')),
  logger = require(path.resolve('./config/lib/logger'));

//doc文件的路径
var saveDir = 'womenfile';
var diskDir = path.resolve(config.uploads.rootDiskDir, saveDir);
var mountDir = path.join(config.uploads.rootMountDir, saveDir).replace(/\\/g, '/');
//目标文件类型
var distType = 'html';
//不同类型参数
var typeParam = {
  //html 字符集utf-8
  html: ':XHTML Writer File:UTF8'
};

/**
 * Show the current article
 */
exports.read = function (req, res) {
  if (!req.docfile) {
    logger.warn('conv docfile arg null');
    return res.status(404).send({
      message: '没有参数docfile'
    });
  }
  var diskFileName = path.join(diskDir, req.docfile);
  fs.exists(diskFileName, function (exists) {
    if (!exists) {
      logger.warn('conv docfile %s not exists', diskFileName);
      return res.status(404).send('参数文件不存在:' + diskFileName);
    }

    var type = distType + (typeParam[distType] ? typeParam[distType] : '');
    var cmdLine = util.format('"%s" --headless --convert-to "%s"  --outdir "%s" "%s"',
      config.sofficePathName, type, diskDir, diskFileName);

    child_process.exec(cmdLine, function (error, stdout, stderr) {
      if (error) {
        logger.warn('conv docfile %s to pdf error:', diskFileName, error.message);
        return res.status(404).send('文件转换错误:' + diskFileName);
      }

      var distFile = path.basename(req.docfile, path.extname(req.docfile)) + '.' + distType;
      var distFileName = path.join(diskDir, distFile);
      fs.exists(distFileName, function (exists) {
        if (!exists) {
          return res.status(404).send('转换后的文件不存在:' + distFileName);
        }
        var options = {};
        res.sendFile(distFileName, options, function (err) {
          if (err) {
            logger.warn('conv docfile send %s fail:', distFileName, err.message);
            //res.status(err.status).end();
          } else {
            logger.debug('conv docfile Sent:', distFileName);
          }
        });
      });
    });
  });
};

/**
 * Article middleware
 */
exports.docfile = function (req, res, next, id) {
  req.docfile = id;
  next();
};
