(function () {
  'use strict';

  angular
    .module('core')
    .controller('PartyDQController', PartyDQController);
  PartyDQController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function PartyDQController($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
  }
}());
