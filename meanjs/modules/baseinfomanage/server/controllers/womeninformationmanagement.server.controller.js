'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  fs = require('fs'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  multer = require(path.resolve('./config/private/multer')),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  sequelize = require(path.resolve('./config/lib/sequelize')),
  util = require('util'),
  child_process = require('child_process'),
  logger = require(path.resolve('./config/lib/logger'))
    .getLogger_FileNameBase(__filename);

var saveDir = 'womenfile';
var diskDir1 = path.resolve(config.uploads.rootDiskDir, saveDir);
var mountDir1 = path.join(config.uploads.rootMountDir, saveDir).replace(/\\/g, '/');
//目标文件类型
var distType = 'html';
//不同类型参数
var typeParam = {
  //html 字符集utf-8
  html: ':XHTML Writer File:UTF8'
};

var async = require('async');
//创建接收头像对象
var uploadImage = new multer(saveDir,
  100 * 1024 * 1024,
  /doc/, '.doc');
//创建目录
uploadImage.mkPaths();
var uploadImage1 = new multer(saveDir,
  100 * 1024 * 1024,
  /image/, '.jpg');
//创建目录
uploadImage1.mkPaths();
/**
 * Create an womenInformationManagement
 */
// exports.create = function (req, res) {
//   var WomenInformationManagement = sequelize.model('WomenInformationManagement');
//   var womenInformationManagement = WomenInformationManagement.build(req.body);
//   var newingImageUrl;
//   var newingPhoto1ImageUrl;
//   if (womenInformationManagement) {
//     uploadImage.recv(req, res, [{name: 'file_path'}, {name: 'photo'}])
//       .then(updateUserInfo)
//       .then(function () {
//         res.json(womenInformationManagement);
//       })
//       .catch(function (err) {
//         logger.error('上传文件失败:', err);
//         res.status(422).send(err);
//       });
//   } else {
//     res.status(401).send({
//       message: 'womenInformationManagement is not exist'
//     });
//   }
//   function updateUserInfo(files) {
//     return new Promise(function (resolve, reject) {
//       if (womenInformationManagement) {
//         if (files && files.file_path && files.file_path.length === 1) {
//           womenInformationManagement.file_path = path.join(uploadImage.mountDir, files.file_path[0].filename).replace(/\\/g, '/');
//           newingImageUrl = womenInformationManagement.file_path;
//
//
//         }
//         if (files && files.photo && files.photo.length === 1) {
//           womenInformationManagement.photo = path.join(uploadImage1.mountDir, files.photo[0].filename).replace(/\\/g, '/');
//           newingPhoto1ImageUrl = womenInformationManagement.photo;
//         }
//         womenInformationManagement.title = req.body.title;
//         womenInformationManagement.type = req.body.type;
//         womenInformationManagement.file_content = req.body.file_content;
//         womenInformationManagement.time_update = req.body.time_update;
//         // womenInformationManagement.photo = req.body.photo;
//         womenInformationManagement.remark = req.body.remark;
//         //图片
//         womenInformationManagement.save().then(function () {
//           resolve();
//         }).catch(function (err) {
//           reject(err);
//         });
//       } else {
//         reject(new Error('no upload'));
//       }
//     });
//   }
// };

/**
 * Show the current womenInformationManagement
 */
exports.read = function (req, res) {
  var womenInformationManagement = req.model ? req.model.toJSON() : {};
  womenInformationManagement.isCurrentUserOwner = !!(req.user && womenInformationManagement.user && womenInformationManagement.user.id.toString() === req.user.id.toString());

  res.json(womenInformationManagement);
};

/**
 * Update an womenInformationManagement
 */
exports.update = function (req, res) {
  var womenInformationManagement;
  var WomenInformationManagement;
  var newingFileUrl;
  var existingFileUrl;
  var aaa;
  var bbb;
  var newingPhotoImageUrl;
  var existingPhotoImageUrl;
  var start = new Date().getTime();
  if (req.model) {
    womenInformationManagement = req.model;
    start = new Date().getTime();
  } else {
    WomenInformationManagement = sequelize.model('WomenInformationManagement');
    womenInformationManagement = WomenInformationManagement.build(req.body);
  }
  if (womenInformationManagement) {
    existingFileUrl = womenInformationManagement.file_path;
    aaa = womenInformationManagement.file_path;
    existingPhotoImageUrl = womenInformationManagement.photo;
    uploadImage1.recv(req, res, [{name: 'file_path'}, {name: 'photo'}])
      .then(updateUserInfo)
      .then(deleteOldImage)
      .then(function () {
        res.json(womenInformationManagement);
      })
      .catch(function (err) {
        logger.error('recv upload womenInformationManagement file err:', err);
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'womenInformationManagement is not exist'
    });
  }

  function updateUserInfo(files) {
    return new Promise(function (resolve, reject) {
      if (womenInformationManagement) {

        if (files && files.photo && files.photo.length === 1) {
          womenInformationManagement.photo = path.join(uploadImage1.mountDir, files.photo[0].filename).replace(/\\/g, '/');
          newingPhotoImageUrl = womenInformationManagement.photo;
        }
        womenInformationManagement.title = req.body.title;
        womenInformationManagement.type = req.body.type;
        womenInformationManagement.file_content = req.body.file_content;
        womenInformationManagement.time_update = req.body.time_update;
        // womenInformationManagement.photo = req.body.photo;
        womenInformationManagement.remark = req.body.remark;
        if (files && files.file_path && files.file_path.length === 1) {
          bbb = path.join(mountDir1, files.file_path[0].filename).replace(/\\/g, '/');
          // newingFileUrl = womenInformationManagement.file_path;
          //  转HTML
          var diskFileName = path.join(diskDir1, files.file_path[0].filename);
          fs.exists(diskFileName, function (exists) {
            if (!exists) {
              logger.warn('conv docfile %s not exists', diskFileName);
              return res.status(404).send('参数文件不存在:' + diskFileName);
            }

            var type = distType + (typeParam[distType] ? typeParam[distType] : '');
            var cmdLine = util.format('"%s" --headless --convert-to "%s"  --outdir "%s" "%s"',
              config.sofficePathName, type, diskDir1, diskFileName);

            child_process.exec(cmdLine, function (error, stdout, stderr) {
              if (error) {
                logger.warn('conv docfile %s to pdf error:', diskFileName, error.message);
                return res.status(404).send('文件转换错误:' + diskFileName);
              }

              var distFile = path.basename(files.file_path[0].filename, path.extname(files.file_path[0].filename)) + '.' + distType;
              var distFileName = path.join(diskDir1, distFile);
              // aaa = distFileName.replace(/\\/g, '/');
              fs.exists(distFileName, function (exists) {
                if (!exists) {
                  return res.status(404).send('转换后的文件不存在:' + distFileName);
                }
                var options = {};
                var distFileName1 = path.join(uploadImage.mountDir, distFile).replace(/\\/g, '/');
                newingFileUrl = distFileName1;
                womenInformationManagement.file_path = distFileName1;
                womenInformationManagement.save().then(function () {
                  resolve();
                }).catch(function (err) {
                  reject(err);
                });
                // res.sendFile(distFileName, options, function (err) {
                //   if (err) {
                //     logger.warn('conv docfile send %s fail:', distFileName, err.message);
                //     //res.status(err.status).end();
                //   } else {
                //     logger.debug('conv docfile Sent:', distFileName);
                //   }
                // });
              });
            });
          });
        }
        //图片
        if (!(files && files.file_path && files.file_path.length === 1)) {
          womenInformationManagement.save().then(function () {
            resolve();
          }).catch(function (err) {
            reject(err);
          });
        }
      } else {
        reject(new Error('no upload'));
      }
    });
  }

  //删除旧照片
  function deleteOldImage() {
    return new Promise(function (resolve, reject) {
      if (bbb) {
        var oldimgname2 = bbb.replace(uploadImage.mountDir, uploadImage1.diskDir);
        fs.unlink(oldimgname2, function (unlinkError) {
        });
      }
      if (existingPhotoImageUrl && newingPhotoImageUrl && existingFileUrl && newingFileUrl) {
        var oldimgname = existingPhotoImageUrl.replace(uploadImage1.mountDir, uploadImage1.diskDir);
        var oldimgname1 = existingFileUrl.replace(uploadImage.mountDir, uploadImage1.diskDir);
        fs.unlink(oldimgname1, function (unlinkError) {
        });
        fs.unlink(oldimgname, function (unlinkError) {
          if (unlinkError) {
            resolve();
          } else {

            resolve();
          }
        });
      } else {
        resolve();
      }
      if (existingPhotoImageUrl && newingPhotoImageUrl) {
        var oldimgname11 = existingPhotoImageUrl.replace(uploadImage1.mountDir, uploadImage1.diskDir);
        fs.unlink(oldimgname11, function (unlinkError) {
          if (unlinkError) {
            resolve();
          } else {

            resolve();
          }
        });
      } else {
        resolve();
      }
      if (existingFileUrl && newingFileUrl) {
        var oldfile = existingFileUrl.replace(uploadImage.mountDir, uploadImage.diskDir);
        fs.unlink(oldfile, function (unlinkError) {
          if (unlinkError) {
            resolve();
          } else {
            resolve();
          }
        });
      } else {
        resolve();
      }
      // if (existingFileUrl && newingFileUrl) {
      //   var oldfile1 = existingFileUrl.replace(mountDir1, diskDir1);
      //   fs.unlink(oldfile1, function (unlinkError) {
      //     if (unlinkError) {
      //       resolve();
      //     } else {
      //       resolve();
      //     }
      //   });
      // } else {
      //   resolve();
      // }
    });
  }
};

/**
 * Delete an womenInformationManagement
 */
exports.delete = function (req, res) {
  var womenInformationManagement = req.model;

  womenInformationManagement.destroy().then(function () {
    res.json(womenInformationManagement);
  }).catch(function (err) {
    return res.status(422).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * List of WomenInformationManagement
 */
exports.list = function (req, res) {
  var WomenInformationManagement = sequelize.model('WomenInformationManagement');

  WomenInformationManagement.findAll({
    limit: [0, 20],
    order: 'id ASC'
  }).then(function (womenInformationManagement) {
    return res.jsonp(womenInformationManagement);
  }).catch(function (err) {
    logger.error('womenInformationManagement list error:', err);
    return res.status(422).send(err);
  });
};

//----分页
function listByPage(req, res, limit, offset) {
  var WomenInformationManagement = sequelize.model('WomenInformationManagement');
  WomenInformationManagement.findAll({
    limit: [limit, offset],
    order: 'id ASC'
  }).then(function (commMemberTable) {
    return res.jsonp(commMemberTable);
  }).catch(function (err) {
    logger.error('WomenInformationManagement list error:', err);
    return res.status(422).send(err);
  });
}
//---------总数
function listCount(req, res) {
  var sql = 'select count(*) sum from WomenInformationManagement';
  sequelize.query(sql, {type: sequelize.QueryTypes.SELECT}).then(function (infos) {
    res.jsonp(infos);
  }).catch(function (err) {
    logger.error('listCount error:', err);
    return res.status(422).send(err);
  });
}

/**
 * WomenInformationManagement middleware
 */
exports.womenInformationManagementByID = function (req, res, next, id) {
  var WomenInformationManagement = sequelize.model('WomenInformationManagement');
  var limit = parseInt(req.query.limit, 0);//(pageNum-1)*20
  var offset = parseInt(req.query.offset, 0);//20 每页总数
  if (offset !== 0 && id === '0') {
    listByPage(req, res, limit, offset);
  } else if (limit === 0 && offset === 0 && id === '0') {
    listCount(req, res);
  } else if (id !== '0') {
    WomenInformationManagement.findOne({
      where: {id: id}
    }).then(function (womenInformationManagement) {
      if (!womenInformationManagement) {
        logger.error('No womenInformationManagement with that identifier has been found');
        return res.status(404).send({
          message: 'No womenInformationManagement with that identifier has been found'
        });
      }

      req.model = womenInformationManagement;
      next();
    }).catch(function (err) {
      //return next(err);
      logger.error('womenInformationManagement ByID error:', err);
      res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    });
  }
};
// cursively make dir
function mkdirs(p, mode, f, made) {
  if (typeof mode === 'function' || mode === undefined) {
    f = mode;
    mode = '0777' & (~process.umask());
  }
  if (!made)
    made = null;

  var cb = f || function () {};
  if (typeof mode === 'string')
    mode = parseInt(mode, 8);
  p = path.resolve(p);

  fs.mkdir(p, mode, function (er) {
    if (!er) {
      made = made || p;
      return cb(null, made);
    }
    switch (er.code) {
      case 'ENOENT':
        mkdirs(path.dirname(p), mode, function (er, made) {
          if (er) {
            cb(er, made);
          } else {
            mkdirs(p, mode, cb, made);
          }
        });
        break;

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        fs.stat(p, function (er2, stat) {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) {
            cb(er, made);
          } else {
            cb(null, made);
          }
        });
        break;
    }
  });
}
// single file copy
function copyFile(file, toDir, cb) {
  async.waterfall([
    function (callback) {
      fs.exists(toDir, function (exists) {
        if (exists) {
          callback(null, false);
        } else {
          callback(null, true);
        }
      });
    }, function (need, callback) {
      if (need) {
        mkdirs(path.dirname(toDir), callback);
      } else {
        callback(null, true);
      }
    }, function (p, callback) {
      var reads = fs.createReadStream(file);
      var writes = fs.createWriteStream(path.join(path.dirname(toDir), path.basename(file)));
      reads.pipe(writes);
      //don't forget close the  when  all the data are read
      reads.on('end', function () {
        writes.end();
        callback(null);
      });
      reads.on('error', function (err) {
        console.log('error occur in reads');
        callback(true, err);
      });

    }
  ], cb);

}

// cursively count the  files that need to be copied

function _ccoutTask(from, to, cbw) {
  async.waterfall([
    function (callback) {
      fs.stat(from, callback);
    },
    function (stats, callback) {
      if (stats.isFile()) {
        cbw.addFile(from, to);
        callback(null, []);
      } else if (stats.isDirectory()) {
        fs.readdir(from, callback);
      }
    },
    function (files, callback) {
      if (files.length) {
        for (var i = 0; i < files.length; i++) {
          _ccoutTask(path.join(from, files[i]), path.join(to, files[i]), cbw.increase());
        }
      }
      callback(null);
    }
  ], cbw);

}
// wrap the callback before counting
function ccoutTask(from, to, cb) {
  var files = [];
  var count = 1;

  function wrapper(err) {
    count--;
    if (err || count <= 0) {
      cb(err, files);
    }
  }

  wrapper.increase = function () {
    count++;
    return wrapper;
  };
  wrapper.addFile = function (file, dir) {
    files.push({
      file: file,
      dir: dir
    });
  };

  _ccoutTask(from, to, wrapper);
}


function copyDir(from, to, cb) {
  if (!cb) {
    cb = function () {
    };
  }
  async.waterfall([
    function (callback) {
      fs.exists(from, function (exists) {
        if (exists) {
          callback(null, true);
        } else {
          console.log(from + 'not exists');
          callback(true);
        }
      });
    },
    function (exists, callback) {
      fs.stat(from, callback);
    },
    function (stats, callback) {
      if (stats.isFile()) {
        // one file copy
        copyFile(from, to, function (err) {
          if (err) {
            // break the waterfall
            callback(true);
          } else {
            callback(null, []);
          }
        });
      } else if (stats.isDirectory()) {
        ccoutTask(from, to, callback);
      }
    },
    function (files, callback) {
      // prevent reaching to max file open limit
      async.mapLimit(files, 10, function (f, cb) {
        copyFile(f.file, f.dir, cb);
      }, callback);
    }
  ], cb);
}


/*

 copyDir("E:\\123", "E:\\456", function (err) {
 if (err) {
 console.log("error ocur");
 console.dir(err);
 } else {

 console.log("copy ok");
 console.log("consume time:" + (new Date().getTime() - start));
 }
 });
 */
