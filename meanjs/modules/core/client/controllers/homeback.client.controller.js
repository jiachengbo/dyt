(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeBackController', HomeBackController);
  HomeBackController.$inject = ['$scope', 'Authentication', '$window', 'menuService', '$rootScope'];
  function HomeBackController($scope, Authentication, $window, menuService, $rootScope) {
    var vm = this;
    $scope.$watch(Authentication, function () {
      if (Authentication.user === null) {
        vm.sectionStyle = {
          'background-image': 'url(\'/modules/core/client/img/image/nav/index.png\')',
          'height': ($window.innerHeight - 1) + 'px',
          'background-repeat': 'round'
        };
      } else {
        vm.sectionStyle = {
          'background-image': 'url(\'/modules/core/client/img/imageh/bgg.png\')',
          'height': ($window.innerHeight - 1 - 80) + 'px',
          'background-repeat': 'round'
        };
      }
    });
    if (Authentication.user) {
      vm.show = true;
    } else {
      vm.show = false;
    }
//隐藏
    vm.menus = menuService;
    vm.menus.leftMenusCollapsed = false;
    $rootScope.$emit('hiddenHead', true);
  }
}());
