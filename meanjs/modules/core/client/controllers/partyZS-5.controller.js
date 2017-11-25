(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyZS5Controller', PartyZS5Controller);
  PartyZS5Controller.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function PartyZS5Controller($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    vm.scoll = function () {
      angular.element(document.querySelector('body'))[0].scrollTop = 0;
    };
    $rootScope.$emit('state', $state.current.url);
  }
}());
