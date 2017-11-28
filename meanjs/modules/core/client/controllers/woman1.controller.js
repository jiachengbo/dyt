(function () {
  'use strict';

  angular
    .module('core')
    .controller('Woman1Controller', Woman1Controller);
  Woman1Controller.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function Woman1Controller($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
  }
}());
