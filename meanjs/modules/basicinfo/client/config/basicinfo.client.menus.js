(function () {
  'use strict';

  angular
    .module('basicinfo')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('sidemenu', {
    //   title: '基础信息管理',
    //   state: 'basicinfo',
    //   type: 'dropdown',
    //   roles: ['*'],
    //   position: 0
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'basicinfo', {
    //   title: '先锋模范',
    //   state: 'basicinfo.pioneerexemplary',
    //   roles: ['*']
    // });
    // menuService.addSubMenuItem('sidemenu', 'basicinfo', {
    //   title: '街道动态',
    //   state: 'basicinfo.streetdynamics',
    //   roles: ['*']
    // });
    // menuService.addSubMenuItem('sidemenu', 'basicinfo', {
    //   title: '高层声音',
    //   state: 'basicinfo.topvoice',
    //   roles: ['*']
    // });
    // menuService.addSubMenuItem('sidemenu', 'basicinfo', {
    //   title: '工会活动',
    //   state: 'basicinfo.tradeunionactivities',
    //   roles: ['*']
    // });
    // menuService.addSubMenuItem('sidemenu', 'basicinfo', {
    //   title: '红雁义工队',
    //   state: 'basicinfo.volunteerteam',
    //   roles: ['*']
    // });
    // menuService.addSubMenuItem('sidemenu', 'basicinfo', {
    //   title: '维权信箱',
    //   state: 'basicinfo.guardianmailbox',
    //   roles: ['*']
    // });
  }
}());
