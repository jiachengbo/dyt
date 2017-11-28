(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['$scope', 'Authentication', '$window', 'menuService', '$rootScope'];
  function HomeController($scope, Authentication, $window, menuService, $rootScope) {
    var vm = this;
    $scope.$watch(Authentication, function () {
      if (Authentication.user === null) {
        vm.sectionStyle = {
          'background-image': 'url(\'/modules/core/client/img/image/nav/index.png\')',
          'background-size': '100% 100%',
          'background-repeat': 'no-repeat',
          'min-height': $rootScope.index1_nav
        };
      } else {
        vm.sectionStyle = {
          'background-image': 'url(\'/modules/core/client/img/imageh/bgg.png\')',
          'height': ($window.innerHeight - 1) + 'px',
          'background-size': '100% 100%',
          'background-repeat': 'no-repeat',
          'min-height': $rootScope.index1_nav
        };
      }
    });
    if (Authentication.user) {
      vm.show = true;
    } else {
      vm.show = false;
    }
    vm.menus = menuService;
    vm.menus.leftMenusCollapsed = false;
    $rootScope.$emit('hiddenHead', true);

  }
}());
