(function () {
  'use strict';

  angular
    .module('partyyl')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('sidemenu', {
    //   title: 'Partyyl',
    //   state: 'partyyl',
    //   type: 'dropdown',
    //   roles: ['*'],
    //   position: 0
    // });
    //
    // // Add the dropdown list item
    // menuService.addSubMenuItem('sidemenu', 'partyyl', {
    //   title: 'manager Partyyl Table',
    //   state: 'partyyl.curd',
    //   roles: ['*']
    // });

  }
}());
