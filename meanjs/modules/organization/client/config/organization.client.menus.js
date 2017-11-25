(function () {
  'use strict';

  angular
    .module('organization')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('sidemenu', {
    //   title: '团组织管理',
    //   state: 'organization',
    //   type: 'dropdown',
    //   roles: ['*'],
    //   position: 0
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'organization', {
    //   title: '团组织',
    //   state: 'organization.ylo',
    //   roles: ['*']
    // });
    // menuService.addSubMenuItem('sidemenu', 'organization', {
    //   title: '团委活动',
    //   state: 'organization.ylca',
    //   roles: ['*']
    // });
  }
}());
