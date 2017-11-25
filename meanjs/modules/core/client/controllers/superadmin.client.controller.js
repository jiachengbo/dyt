(function () {
  'use strict';

  angular
    .module('core')
    .controller('SuperAdminController', SuperAdminController);
  SuperAdminController.$inject = ['$scope', 'Authentication', '$window', 'menuService', '$rootScope', '$state'];
  function SuperAdminController($scope, Authentication, $window, menuService, $rootScope, $state) {
    var vm = this;
    $rootScope.$emit('hiddenHead', false);
    vm.menus = menuService;
    vm.menus.leftMenusCollapsed = true;
    vm.role = ['user'];
    $scope.itemClick = function (params, type) {
      switch (params) {
        case 'jdadmin':
          vm.role.push('jdadmin');
          break;
        case 'ghadmin':
          vm.role.push('ghadmin');
          break;
        case 'twadmin':
          vm.role.push('twadmin');
          break;
        case 'fulian':
          vm.role.push('fulian');
          break;
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
        case 'xtadmin':
          vm.role.push('xtadmin');
          break;
        default:
          break;
      }
      Authentication.user.roles = vm.role;
      $state.go('homeback');
    };
    vm.goBack = function () {
      Authentication.user = null;
      $state.go('authentication.signin');
    };
  }
}());
