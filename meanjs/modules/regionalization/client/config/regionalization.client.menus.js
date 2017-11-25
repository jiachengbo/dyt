(function () {
  'use strict';

  angular
    .module('regionalization')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('sidemenu', {
      title: '区域化党建',
      state: 'regionalization',
      type: 'dropdown',
      roles: ['admin', 'adminrole'],
      position: 0
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('sidemenu', 'regionalization', {
      title: '项目管理',
      state: 'regionalization.project',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'regionalization', {
      title: '党建动态',
      state: 'regionalization.dynamic',
      roles: ['*']
    });
    menuService.addSubMenuItem('sidemenu', 'regionalization', {
      title: '互动交流',
      state: 'regionalization.interation',
      roles: ['*']
    });

  }
}());
