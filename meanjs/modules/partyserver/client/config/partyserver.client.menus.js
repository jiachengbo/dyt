(function () {
  'use strict';

  angular
    .module('partyserver')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
   /* menuService.addMenuItem('sidemenu', {
      title: '党群服务',
      state: 'partyserver.curd',
      // type: 'dropdown',
      roles: ['xtadmin'],
      position: 0
    });*/

    // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'partyserver', {
    //   title: 'manager Partyserver Table',
    //   state: 'partyserver.curd',
    //   roles: ['*']
    // });

  }
}());
