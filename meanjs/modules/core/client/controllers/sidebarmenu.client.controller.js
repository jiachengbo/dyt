(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidebarMenuController', SidebarMenuController);

  SidebarMenuController.$inject = ['$scope', '$state', '$window', 'Authentication', 'menuService'];

  function SidebarMenuController($scope, $state, $window, Authentication, menuService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.menus = menuService;
    vm.sidemenu = menuService.getMenu('sidemenu');
    vm.sidemenu.items.forEach(function (item) {
      if (item.title === '基础信息管理') {
        item.icon1 = '/modules/core/client/img/imageh/jcxx1.png';
        item.icon2 = '/modules/core/client/img/imageh/jcxx2.png';
      } else if (item.title === '重点工作动态') {
        item.icon1 = '/modules/core/client/img/imageh/zdgzdt1.png';
        item.icon2 = '/modules/core/client/img/imageh/zdgzdt2.png';
      } else if (item.title === '民情地图') {
        item.icon1 = '/modules/core/client/img/imageh/mqdt1.png';
        item.icon2 = '/modules/core/client/img/imageh/mqdt2.png';
      } else if (item.title === '区域化党建') {
        item.icon1 = '/modules/core/client/img/imageh/qu1.png';
        item.icon2 = '/modules/core/client/img/imageh/qu2.png';
      } else if (item.title === '系统管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '先锋模范管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '团委信息管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '妇联信息管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '工会信息管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '街道信息管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '非公党建管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '机关党建管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '社会组织党建管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      } else if (item.title === '农村党建管理') {
        item.icon1 = '/modules/core/client/img/imageh/xtgl1.png';
        item.icon2 = '/modules/core/client/img/imageh/xtgl2.png';
      }
    });
    //只能有一个展开的菜单
    var prevMenuItem = null;
    vm.toggleMenuItem = function(menuitem) {
      if (!prevMenuItem) {
        menuitem.isCollapsed = false;
      } else if (prevMenuItem !== menuitem) {
        prevMenuItem.isCollapsed = true;
        menuitem.isCollapsed = false;
      } else {
        menuitem.isCollapsed = !menuitem.isCollapsed;
      }

      prevMenuItem = menuitem;
    };

    vm.clickMenuItem = function(menuitem) {
      //console.log('inwidth: %d, height: %d', $window.innerWidth, $window.innerHeight);
      collapsedMenu();
    };

    //根据屏幕宽度，缩回菜单
    function collapsedMenu() {
      if ($window.innerWidth <= 767) {
        menuService.leftMenusCollapsed = true;
      }
    }

    //初始化显示
    collapsedMenu();
  }
}());
