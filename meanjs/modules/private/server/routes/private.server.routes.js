"use strict";var path=require("path"),router=require("express").Router(),prictrl=require(path.resolve("./modules/private/server/controllers/private.server.controller"));module.exports=function(e){if(router.route("/localstorage").post(prictrl.getLocalStorage),require(path.resolve("./config/private/socket.io")).getIoServer()){var r=require(path.resolve("./modules/private/server/sockets/server.server.socket"));router.route("/datasync").post(r.dataSync),router.route("/handleend").post(r.handleEnd)}e.use("/api",router)};