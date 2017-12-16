(function () {
  'use strict';

  angular
    .module('activity')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: 'Activity',
      state: 'activity.curd',
      // type: 'dropdown',
      roles: ['xtadmin'],
      position: 0
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'activity', {
    //   title: 'manager Activity Table',
    //   state: 'activity.curd',
    //   roles: ['*']
    // });

  }
}());
