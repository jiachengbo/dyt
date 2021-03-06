"use strict";function checkPacket(e){var t,r={};return e?e.tableName&&"string"==typeof e.tableName?(r.tableName=e.tableName.trim(),e.streetID&&"string"==typeof e.streetID?(r.streetID=e.streetID.trim(),t=Number(e.type),!e.type||isNaN(t)||t!==TYPE.ADD&&t!==TYPE.UPDATE&&t!==TYPE.DEL?"参数同步类型type错误":(r.type=t,e.field&&"object"==typeof e.field?(r.field=e.field,r):"参数同步记录数据field无效或类型错误")):"参数同步街道id无效或类型错误"):"参数同步表名称tableName无效或类型错误":"数据包空错误"}function Cmd_DataSync(){Command.apply(this,arguments)}function Req_DataSync(){Request.apply(this,arguments)}var path=require("path"),RESULT=require(path.resolve("./modules/private/server/sockets/const.server.socket")).RESULT,Command=require(path.resolve("./modules/private/server/sockets/command.server.socket")),Request=require(path.resolve("./modules/private/server/sockets/request.server.socket")),sequelize=require(path.resolve("./config/lib/sequelize")),dbTools=require(path.resolve("./config/private/dbtools")),logger=require(path.resolve("./config/lib/logger")).getLogger("socketio.DataSync"),SCHEMA="wwyt",TYPE={ADD:1,UPDATE:2,DEL:3};Cmd_DataSync.prototype=Object.create(Command.prototype),Cmd_DataSync.prototype.recvRespon=function(e,t){return logger.debug("Cmd_DataSync recvrespon:",e,t),Object.getPrototypeOf(Object.getPrototypeOf(this)).recvRespon(e,t)},Req_DataSync.prototype=Object.create(Request.prototype),Req_DataSync.prototype.recvRequest=function(e){logger.debug("Req_DataSync recvrequest:",JSON.stringify(e));var t=checkPacket(e.msgrecv);if("string"==typeof t)return Promise.reject(new Error("packet format error:"+t));var r=dbTools.getModel(t.tableName);return r?(SCHEMA&&(r=r.schema(SCHEMA)),r.describe().catch(function(e){return r.sync({loging:!1})}).then(function(e){if(t.field.streetID=t.streetID,t.type===TYPE.ADD)return r.create(t.field);for(var o=r.primaryKeyAttributes,a={},n=0;n<o.length;n++){var s=o[n];if(!t.field.hasOwnProperty(s))throw new Error("field no key:"+s);a[s]=t.field[s]}return r.findOne({where:a}).then(function(e){if(!e)throw new Error("no find record field key:"+JSON.stringify(a));if(t.type===TYPE.UPDATE)return e.update(t.field);if(t.type===TYPE.DEL)return e.destroy();throw new Error("packet type error:"+t.type)})}).then(function(r){return e.msgsend="model:"+t.tableName+" type:"+t.type+" good",RESULT.GOOD})):Promise.reject(new Error("model:"+t.tableName+" not defined"))},exports.Command=Cmd_DataSync,exports.Request=Req_DataSync,exports.TYPE=TYPE,exports.checkPacket=checkPacket;