(function () {
  'use strict';

  angular
    .module('activitysquare')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    /*menuService.addMenuItem('sidemenu', {
      title: '活动广场',
      state: 'activitysquare.curd',
      // type: 'dropdown',
      roles: ['xtadmin'],
      position: 0
    });*/

    // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'activitysquare', {
    //   title: 'manager Activitysquare Table',
    //   state: 'activitysquare.curd',
    //   roles: ['*']
    // });

  }
}());
