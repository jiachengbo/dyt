(function () {
  'use strict';

  angular
    .module('littlewish')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    /*menuService.addMenuItem('sidemenu', {
      title: '微心愿',
      state: 'littlewish.curd',
      // type: 'dropdown',
      roles: ['xtadmin'],
      position: 0
    });*/

    // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'littlewish', {
    //   title: 'manager Littlewish Table',
    //   state: 'littlewish.curd',
    //   roles: ['*']
    // });

  }
}());
