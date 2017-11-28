(function () {
  'use strict';

  angular
    .module('applyNow')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('sidemenu', {
    //   title: '在线申请',
    //   state: 'applyNow',
    //   type: 'dropdown',
    //   roles: ['admin', 'adminrole'],
    //   position: 0
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'applyNow', {
    //   title: '党关系转接在线申请',
    //   state: 'applyNow.curd',
    //   roles: ['*']
    // });

  }
}());
