"use strict";var path=require("path");module.exports=function(e,r){require(path.resolve("./modules/private/server/sockets/server.server.socket")).emit("newSocket",r,r.request.user)};