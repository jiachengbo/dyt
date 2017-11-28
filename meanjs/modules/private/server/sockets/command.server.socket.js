"use strict";function Command(e,t){EventEmitter.call(this),this.socket=e,this.cmdRec=this.readCmdRec(t),this.timeoutObj=null,this.options="object"==typeof t.msgarg&&t.msgarg||{}}var path=require("path"),EventEmitter=require("events"),putils=require(path.resolve("./config/private/utils")),RESULT=require(path.resolve("./modules/private/server/sockets/const.server.socket")).RESULT,logger=require(path.resolve("./config/lib/logger")).getLogger("socketio.command");Command.prototype=Object.create(EventEmitter.prototype),module.exports=Command,Command.prototype.readCmdRec=function(e){return{id:e.id,attempttimes:e.attempttimes,msgcode:e.msgcode,msgsend:e.msgsend,lastsend_time:e.lastsend_time,lastrecv_time:e.lastrecv_time,msgrecv:e.msgrecv,result:e.result||RESULT.NOCOMPLETE}},Command.prototype.buildMsg=function(e){return{id:e.id,attempttimes:e.attempttimes,lastsend_time:e.lastsend_time,msgsend:e.msgsend}},Command.prototype.clearTimeout=function(){this.timeoutObj&&(clearTimeout(this.timeoutObj),this.timeoutObj=null)},Command.prototype.timeout=function(){return Promise.resolve(RESULT.TIMEOUT)},Command.prototype.recvRespon=function(e,t){return e?(e instanceof Error||(e=new Error(e.message||"unknow error message")),Promise.reject(e)):Promise.resolve(RESULT.GOOD)},Command.prototype.sendCmd=function(e,t,r){var o=this.buildMsg(e);t?this.socket.emit(e.msgcode,o,r):(this.socket.emit(e.msgcode,o),r(null,null))},Command.prototype.run=function(){var e=this;return new Promise(function(t,r){function o(){return e.clearTimeout(),e.timeout().then(function(e){t(e)}).catch(function(e){r(e)})}e.cmdRec.attempttimes++,e.cmdRec.lastsend_time=new Date,e.timeoutObj=setTimeout(o,e.options.timeout<=0?1e3:e.options.timeout),e.sendCmd.call(e,e.cmdRec,e.options.respon,function(o,n){if(!e.timeoutObj)return void logger.warn("sendcmd %s after timeout recv respon, ignore",e.cmdRec.msgcode);e.clearTimeout(),e.cmdRec.msgrecv=n,e.options.respon?(e.cmdRec.lastrecv_time=new Date,e.recvRespon.call(e,o,e.cmdRec).then(function(e){t(e)}).catch(function(e){r(e)})):o?process.nextTick(r,o):process.nextTick(t,RESULT.GOOD)})}).then(function(t){if("number"!=typeof t)throw new Error("recvReson return not number error");if(e.cmdRec.attempttimes>=e.options.maxTimes){if(t===RESULT.NOCOMPLETE)throw new Error("recvReson run times up limit error")}else t===RESULT.TIMEOUT&&(t=RESULT.NOCOMPLETE);return e.cmdRec.result=t,t===RESULT.NOCOMPLETE?new Promise(function(e,t){setTimeout(e,100)}).then(function(){return e.run()}):e.cmdRec}).catch(function(t){return logger.error("cmd %s run error:",e.cmdRec.msgcode,t),e.cmdRec.result>=RESULT.NOCOMPLETE&&(e.cmdRec.result=RESULT.ERROR),e.cmdRec.msgrecv=t,e.cmdRec})};