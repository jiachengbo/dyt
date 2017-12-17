(function () {
  'use strict';

  angular
    .module('core.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '系统管理',
      state: 'admin',
      type: 'dropdown',
      roles: ['xtadmin'],
      position: 1000
    });
    //团委
    menuService.addMenuItem('sidemenu', {
      title: '团委信息管理',
      state: 'tw',
      type: 'dropdown',
      roles: ['twadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'tw', {
      title: '团员',
      state: 'leagueMemberTable',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'tw', {
      title: '团组织',
      state: 'leagueOrganizationTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'tw', {
      title: '团委活动',
      state: 'organization.ylca',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'tw', {
      title: '红雁义工队',
      state: 'basicinfo.volunteerteam',
      roles: ['*']
    });
    //妇联
    menuService.addMenuItem('sidemenu', {
      title: '妇联信息管理',
      state: 'fl',
      type: 'dropdown',
      roles: ['fulian'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'fl', {
      title: '妇联信息',
      state: 'womenInformationManagement',
      roles: ['*']
    });
    // menuService.addSubMenuItem('sidemenu', 'fl', {
    //   title: '文件转换',
    //   state: 'docconv',
    //   roles: ['*'],
    //   position: 1
    // });

    //工会管理
    menuService.addMenuItem('sidemenu', {
      title: '工会信息管理',
      state: 'gh',
      type: 'dropdown',
      roles: ['ghadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'gh', {
      title: '工会信息',
      state: 'unionInformationManagement',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'gh', {
      title: '工会活动',
      state: 'basicinfo.tradeunionactivities',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'gh', {
      title: '维权信箱',
      state: 'basicinfo.guardianmailbox',
      roles: ['*']
    });
    //街道管理
    menuService.addMenuItem('sidemenu', {
      title: '街道信息管理',
      state: 'jd',
      type: 'dropdown',
      roles: ['jdadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '街道动态',
      state: 'basicinfo.streetdynamics',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '街道班子成员',
      state: 'streetMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '社区班子成员',
      state: 'commMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '驻地单位',
      state: 'stationUnitManagement',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '基层站所',
      state: 'basicStationManagement',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '高层声音',
      state: 'basicinfo.topvoice',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '通知公告',
      state: 'basicinfo.tongzhi',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '文明单位',
      state: 'advancedUnitManagement',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '党关系转接在线申请',
      state: 'applyNow.curd',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jd', {
      title: '党建引领',
      state: 'partyyl.curd',
      roles: ['*']
    });
    //非公党建管理
    menuService.addMenuItem('sidemenu', {
      title: '基础信息管理',
      state: 'fgjc',
      type: 'dropdown',
      roles: ['fgadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'fgjc', {
      title: '党员',
      state: 'partyMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'fgjc', {
      title: '党组织',
      state: 'partyOrganizationTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'fgjc', {
      title: '党建指导员',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '非公党建管理',
      state: 'fg',
      type: 'dropdown',
      roles: ['fgadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'fg', {
      title: '工作动态',
      state: 'dynamic.main.one',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'fg', {
      title: '党建动态',
      state: 'regionalization.dynamic',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'fg', {
      title: '互动交流',
      state: 'regionalization.interation',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'fg', {
      title: '评星晋级争双强',
      state: 'dynamic.starjudgments',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'fg', {
      title: '职业水平认证',
      state: 'dynamic.professionalgrading',
      roles: ['*']
    });
    //机关党建管理
    menuService.addMenuItem('sidemenu', {
      title: '基础信息管理',
      state: 'jgjc',
      type: 'dropdown',
      roles: ['jgadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'jgjc', {
      title: '党员',
      state: 'partyMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jgjc', {
      title: '党组织',
      state: 'partyOrganizationTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jgjc', {
      title: '党建指导员',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '机关党建管理',
      state: 'jg',
      type: 'dropdown',
      roles: ['jgadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'jg', {
      title: '工作动态',
      state: 'dynamic.main.one',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jg', {
      title: '党建动态',
      state: 'regionalization.dynamic',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jg', {
      title: '互动交流',
      state: 'regionalization.interation',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jg', {
      title: '评星晋级争双强',
      state: 'dynamic.starjudgments',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'jg', {
      title: '职业水平认证',
      state: 'dynamic.professionalgrading',
      roles: ['*']
    });
    //社会组织党建管理
    menuService.addMenuItem('sidemenu', {
      title: '基础信息管理',
      state: 'shzzjc',
      type: 'dropdown',
      roles: ['shzzadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'shzzjc', {
      title: '党员',
      state: 'partyMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'shzzjc', {
      title: '党组织',
      state: 'partyOrganizationTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'shzzjc', {
      title: '党建指导员',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '社会组织党建管理',
      state: 'shzz',
      type: 'dropdown',
      roles: ['shzzadmin'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'shzz', {
      title: '工作动态',
      state: 'dynamic.main.one',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'shzz', {
      title: '党建动态',
      state: 'regionalization.dynamic',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'shzz', {
      title: '互动交流',
      state: 'regionalization.interation',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'shzz', {
      title: '评星晋级争双强',
      state: 'dynamic.starjudgments',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'shzz', {
      title: '职业水平认证',
      state: 'dynamic.professionalgrading',
      roles: ['*']
    });
    //社区党建管理
    menuService.addMenuItem('sidemenu', {
      title: '基础信息管理',
      state: 'sqjc',
      type: 'dropdown',
      roles: ['sqadmin', 'sq_wjsquser', 'sq_qlsquser', 'sq_yxsquser',
        'sq_xysquser', 'sq_tyysquser', 'sq_xylsquser', 'sq_bysquser', 'sq_xksquser', 'sq_swsquser', 'sq_ytlsquser',
        'sq_hbztsquser', 'sq_hcsquser', 'sq_chblsquser', 'sq_kjdxsquser', 'sq_chnlsquser', 'sq_jdcjsquser',
        'sq_jysquser', 'sq_xktsquser', 'sq_dytsquser', 'sq_tycuser', 'sq_tecuser', 'sq_dytcuser', 'sq_wjcuser',
        'sq_gymcuser', 'sq_tpbcuser'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'sqjc', {
      title: '党员',
      state: 'partyMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqjc', {
      title: '党组织',
      state: 'partyOrganizationTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqjc', {
      title: '党建指导员',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqjc', {
      title: '三长三员',
      state: 'threeMasterMemberManagement',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqjc', {
      title: '三级包抓机制',
      state: 'areadepartmentmanagement',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '重点工作动态',
      state: 'sqzd',
      type: 'dropdown',
      roles: ['sqadmin', 'sq_wjsquser', 'sq_qlsquser', 'sq_yxsquser',
        'sq_xysquser', 'sq_tyysquser', 'sq_xylsquser', 'sq_bysquser', 'sq_xksquser', 'sq_swsquser', 'sq_ytlsquser',
        'sq_hbztsquser', 'sq_hcsquser', 'sq_chblsquser', 'sq_kjdxsquser', 'sq_chnlsquser', 'sq_jdcjsquser',
        'sq_jysquser', 'sq_xktsquser', 'sq_dytsquser', 'sq_tycuser', 'sq_tecuser', 'sq_dytcuser', 'sq_wjcuser',
        'sq_gymcuser', 'sq_tpbcuser'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'sqzd', {
      title: '工作动态',
      state: 'dynamic.main.one',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqzd', {
      title: '学习动态',
      state: 'dynamic.learningdynamics',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqzd', {
      title: '在职党员进社区',
      state: 'dynamic.entercommunity',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '区域化党建',
      state: 'sqqy',
      type: 'dropdown',
      roles: ['sqadmin', 'sq_wjsquser', 'sq_qlsquser', 'sq_yxsquser',
        'sq_xysquser', 'sq_tyysquser', 'sq_xylsquser', 'sq_bysquser', 'sq_xksquser', 'sq_swsquser', 'sq_ytlsquser',
        'sq_hbztsquser', 'sq_hcsquser', 'sq_chblsquser', 'sq_kjdxsquser', 'sq_chnlsquser', 'sq_jdcjsquser',
        'sq_jysquser', 'sq_xktsquser', 'sq_dytsquser', 'sq_tycuser', 'sq_tecuser', 'sq_dytcuser', 'sq_wjcuser',
        'sq_gymcuser', 'sq_tpbcuser'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'sqqy', {
      title: '项目管理',
      state: 'regionalization.project',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqqy', {
      title: '党建动态',
      state: 'regionalization.dynamic',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqqy', {
      title: '互动交流',
      state: 'regionalization.interation',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqqy', {
      title: '社区党建共建联合会',
      state: 'dynamic.federations',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'sqqy', {
      title: '街道党建联席会',
      state: 'dynamic.julac',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '先锋模范管理',
      state: 'sqxf',
      type: 'dropdown',
      roles: ['sqadmin', 'sq_wjsquser', 'sq_qlsquser', 'sq_yxsquser',
        'sq_xysquser', 'sq_tyysquser', 'sq_xylsquser', 'sq_bysquser', 'sq_xksquser', 'sq_swsquser', 'sq_ytlsquser',
        'sq_hbztsquser', 'sq_hcsquser', 'sq_chblsquser', 'sq_kjdxsquser', 'sq_chnlsquser', 'sq_jdcjsquser',
        'sq_jysquser', 'sq_xktsquser', 'sq_dytsquser', 'sq_tycuser', 'sq_tecuser', 'sq_dytcuser', 'sq_wjcuser',
        'sq_gymcuser', 'sq_tpbcuser'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'sqxf', {
      title: '领头雁',
      state: 'basicinfo.pioneerexemplary',
      roles: ['*']
    });
    //农村党建管理
    menuService.addMenuItem('sidemenu', {
      title: '基础信息管理',
      state: 'ncjc',
      type: 'dropdown',
      roles: ['ncadmin', 'nc_wjsquser', 'nc_qlsquser', 'nc_yxsquser', 'nc_xysquser', 'nc_tyysquser',
        'nc_xylsquser', 'nc_bysquser', 'nc_xksquser', 'nc_swsquser', 'nc_ytlsquser', 'nc_hbztsquser', 'nc_hcsquser',
        'nc_chblsquser', 'nc_kjdxsquser', 'nc_chnlsquser', 'nc_jdcjsquser', 'nc_jysquser', 'nc_xktsquser',
        'nc_dytsquser', 'nc_tycuser', 'nc_tecuser', 'nc_dytcuser', 'nc_wjcuser', 'nc_gymcuser', 'nc_tpbcuser'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'ncjc', {
      title: '党员',
      state: 'partyMemberTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncjc', {
      title: '党组织',
      state: 'partyOrganizationTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncjc', {
      title: '党建指导员',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncjc', {
      title: '三级包抓机制',
      state: 'areadepartmentmanagement',
      roles: ['*']
    });
    menuService.addMenuItem('sidemenu', {
      title: '农村党建管理',
      state: 'ncdj',
      type: 'dropdown',
      roles: ['ncadmin', 'nc_wjsquser', 'nc_qlsquser', 'nc_yxsquser', 'nc_xysquser', 'nc_tyysquser',
        'nc_xylsquser', 'nc_bysquser', 'nc_xksquser', 'nc_swsquser', 'nc_ytlsquser', 'nc_hbztsquser', 'nc_hcsquser',
        'nc_chblsquser', 'nc_kjdxsquser', 'nc_chnlsquser', 'nc_jdcjsquser', 'nc_jysquser', 'nc_xktsquser',
        'nc_dytsquser', 'nc_tycuser', 'nc_tecuser', 'nc_dytcuser', 'nc_wjcuser', 'nc_gymcuser', 'nc_tpbcuser'],
      position: 1000
    });
    menuService.addSubMenuItem('sidemenu', 'ncdj', {
      title: '党建动态',
      state: 'regionalization.dynamic',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncdj', {
      title: '工作动态',
      state: 'dynamic.main.one',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncdj', {
      title: '互动交流',
      state: 'regionalization.interation',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncdj', {
      title: '三务公开',
      state: 'dynamic.threeservice',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncdj', {
      title: '党组织整顿',
      state: 'dynamic.rectifying',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'ncdj', {
      title: '脱贫攻坚',
      state: 'dynamic.povertyalleviation',
      roles: ['*']
    });
  }
}());
