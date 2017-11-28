(function () {
  'use strict';

  angular
    .module('core')
    .controller('JiGouController', JiGouController);
  JiGouController.$inject = ['$scope', '$rootScope', '$state', '$window', '$uibModalInstance', 'type'];
  function JiGouController($scope, $rootScope, $state, $window, $uibModalInstance, type) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.type = type;
    if (vm.type === 'gonghui') {
      vm.img = '/modules/core/client/img/image/gonghui/jigoutu.png';
    } else if (vm.type === 'fulian') {
      vm.img = '/modules/core/client/img/image/fulian/jigoutu.png';
    } else if (vm.type === 'tuanwei') {
      vm.img = '/modules/core/client/img/image/tuanwei/jigoutu.png';
    }
    vm.ok = function () {

    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
