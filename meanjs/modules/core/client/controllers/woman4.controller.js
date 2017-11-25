(function () {
  'use strict';

  angular
    .module('core')
    .controller('Woman4Controller', Woman4Controller);
  Woman4Controller.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function Woman4Controller($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
  }
}());
