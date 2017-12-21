(function () {
  'use strict';

  angular
    .module('stonehill')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '他山之石',
      state: 'stonehill.curd',
      // type: 'dropdown',
      roles: ['xtadmin'],
      position: 0
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'stonehill', {
    //   title: 'manager Stonehill Table',
    //   state: 'stonehill.curd',
    //   roles: ['*']
    // });

  }
}());
