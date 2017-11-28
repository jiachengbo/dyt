(function () {
  'use strict';

  angular
    .module('sysparam')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addSubMenuItem('sidemenu', 'admin', {
      title: '系统参数',
      state: 'admin.sysparam.curd',
      position: 1000
    });
  }
}());
