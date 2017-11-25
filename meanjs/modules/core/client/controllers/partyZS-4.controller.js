(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyZS4Controller', PartyZS4Controller);
  PartyZS4Controller.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function PartyZS4Controller($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
  }
}());
