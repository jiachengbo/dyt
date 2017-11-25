(function () {
  'use strict';

  angular
    .module('baseinfomanage')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '基础信息管理',
      state: 'baseinfomanage',
      type: 'dropdown',
      roles: ['admin', 'adminrole'],
      position: 0
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '街道班子成员',
      state: 'streetMemberTable',
      roles: ['admin']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '社区班子成员',
      state: 'commMemberTable',
      roles: ['admin']
    });
// Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '三级包抓机制',
      state: 'areadepartmentmanagement',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '党建指导员',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });/*
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '党建指导员分配管理',
      state: 'partyBuildInstructorTable',
      roles: ['*']
    });*/
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '党员',
      state: 'partyMemberTable',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '党组织',
      state: 'partyOrganizationTable',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '团员',
      state: 'leagueMemberTable',
      roles: ['admin']
    });

    // organization 模块菜单 团组织管理
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '团组织',
      state: 'leagueOrganizationTable',
      roles: ['admin']
    });
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '团委活动',
      state: 'organization.ylca',
      roles: ['admin']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '驻地单位',
      state: 'stationUnitManagement',
      roles: ['admin']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '三长三员',
      state: 'threeMasterMemberManagement',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '基层站所',
      state: 'basicStationManagement',
      roles: ['admin']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '工会信息',
      state: 'unionInformationManagement',
      roles: ['admin']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '妇联信息',
      state: 'womenInformationManagement',
      roles: ['admin']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '文明单位',
      state: 'advancedUnitManagement',
      roles: ['admin']
    });


   //basicinfo模块菜单栏
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '领头雁',
      state: 'basicinfo.pioneerexemplary',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '街道动态',
      state: 'basicinfo.streetdynamics',
      roles: ['admin']
    });
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '高层声音',
      state: 'basicinfo.topvoice',
      roles: ['admin']
    });
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '工会活动',
      state: 'basicinfo.tradeunionactivities',
      roles: ['admin']
    });
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '红雁义工队',
      state: 'basicinfo.volunteerteam',
      roles: ['admin']
    });
    menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
      title: '维权信箱',
      state: 'basicinfo.guardianmailbox',
      roles: ['admin']
    });
    // menuService.addSubMenuItem('sidemenu', 'baseinfomanage', {
    //   title: '文件转换',
    //   state: 'docconv',
    //   roles: ['admin'],
    //   position: 1
    // });
  }
}());
