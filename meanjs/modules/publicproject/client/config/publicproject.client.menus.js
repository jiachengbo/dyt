(function () {
  'use strict';

  angular
    .module('publicproject')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: 'Publicproject',
      state: 'publicproject.curd',
      // type: 'dropdown',
      roles: ['xtadmin'],
      position: 0
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'publicproject', {
    //   title: 'manager Publicproject Table',
    //   state: 'publicproject.curd',
    //   roles: ['*']
    // });

  }
}());
