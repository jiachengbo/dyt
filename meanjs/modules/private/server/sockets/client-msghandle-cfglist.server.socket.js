"use strict";var path=require("path"),MH_StateIn=require(path.resolve("./modules/private/server/sockets/msghandle-statein.server.socket")),MH_StateOut=require(path.resolve("./modules/private/server/sockets/msghandle-stateout.server.socket")),MH_Dispatch=require(path.resolve("./modules/private/server/sockets/msghandle-dispatch.server.socket")),MH_DataSync=require(path.resolve("./modules/private/server/sockets/msghandle-datasync.server.socket")),MHCfgList=require(path.resolve("./modules/private/server/sockets/msghandle-cfglist.server.socket")),logger=require(path.resolve("./config/lib/logger")).getLogger("socketio"),mhCfgList=new MHCfgList;mhCfgList.addMsgCfg("STATEIN",null,MH_StateIn.Request,{respon:!1}),mhCfgList.addMsgCfg("STATEOUT",null,MH_StateOut.Request,{respon:!1}),mhCfgList.addMsgCfg("DISPATCH",null,MH_Dispatch.Request),mhCfgList.addMsgCfg("DATASYNC",MH_DataSync.Command),module.exports=mhCfgList;