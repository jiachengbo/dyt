(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyDHController', PartyDHController);
  PartyDHController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function PartyDHController($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
  }
}());
