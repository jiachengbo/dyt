(function () {
  'use strict';

  angular
    .module('core')
    .controller('PtAdminController', PtAdminController);
  PtAdminController.$inject = ['$scope', '$rootScope', '$window', 'menuService', 'Authentication', '$state'];
  function PtAdminController($scope, $rootScope, $window, menuService, Authentication, $state) {
    var vm = this;
    $rootScope.$emit('hiddenHead', false);
    vm.menus = menuService;
    vm.menus.leftMenusCollapsed = true;
    vm.role = ['user'];
    $scope.itemClick = function (params, type) {
      switch (params) {
        case 'fgadmin':
          vm.role.push('fgadmin');
          vm.role.push(type);
          break;
        case 'jgadmin':
          vm.role.push('jgadmin');
          vm.role.push(type);
          break;
        case 'shzzadmin':
          vm.role.push('shzzadmin');
          vm.role.push(type);
          break;
        case 'ncadmin':
          vm.role.push('ncadmin');
          vm.role.push(type);
          break;
        case 'sqadmin':
          vm.role.push('sqadmin');
          vm.role.push(type);
          break;
        default:
          break;
      }
      Authentication.user.roles = vm.role;
      $state.go('homeback');
    };
    vm.goBack = function () {
      Authentication.user = null;
      $state.go('home');
    };
  }
}());
