"use strict";function Cmd_StateIn(){Command.apply(this,arguments)}function Req_StateIn(){Request.apply(this,arguments)}var path=require("path"),RESULT=require(path.resolve("./modules/private/server/sockets/const.server.socket")).RESULT,Command=require(path.resolve("./modules/private/server/sockets/command.server.socket")),Request=require(path.resolve("./modules/private/server/sockets/request.server.socket")),logger=require(path.resolve("./config/lib/logger")).getLogger("socketio");Cmd_StateIn.prototype=Object.create(Command.prototype),Req_StateIn.prototype=Object.create(Request.prototype),Req_StateIn.prototype.recvRequest=function(e){return logger.debug("Req_StateIn recvrequest:",e),Promise.resolve(RESULT.GOOD)},exports.Command=Cmd_StateIn,exports.Request=Req_StateIn;