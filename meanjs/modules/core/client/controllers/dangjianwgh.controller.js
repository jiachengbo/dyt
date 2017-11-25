(function () {
  'use strict';

  angular
    .module('core')
    .controller('DangJianWGHController', DangJianWGHController);
  DangJianWGHController.$inject = ['$scope', 'Authentication', '$window', 'partybuildService', '$state', '$rootScope'];
  function DangJianWGHController($scope, Authentication, $window, partybuildService, $state, $rootScope) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
  }
}());
