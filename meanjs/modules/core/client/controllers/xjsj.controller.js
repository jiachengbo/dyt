(function () {
  'use strict';

  angular
    .module('core')
    .controller('xjsjController', xjsjController);
  xjsjController.$inject = ['$scope', '$rootScope', '$state', '$window', '$uibModalInstance', 'type'];
  function xjsjController($scope, $rootScope, $state, $window, $uibModalInstance, type) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.name = type.name;
    vm.type = type.deeds;
    vm.ok = function () {

    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
