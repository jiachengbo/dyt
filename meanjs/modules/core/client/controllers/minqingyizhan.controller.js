(function () {
  'use strict';

  angular
    .module('core')
    .controller('MinqingEController', MinqingEController);
  MinqingEController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function MinqingEController($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
  }
}());
