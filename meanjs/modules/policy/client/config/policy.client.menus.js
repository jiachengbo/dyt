(function () {
  'use strict';

  angular
    .module('policy')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    /*menuService.addMenuItem('sidemenu', {
      title: 'Policy',
      state: 'policy',
      type: 'dropdown',
      roles: ['*'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'policy', {
      title: 'manager Policy Table',
      state: 'policy.curd',
      roles: ['*']
    });*/

  }
}());
