(function () {
  'use strict';

  angular
    .module('core')
    .controller('JoinUsModalFormController', JoinUsModalFormController);
  JoinUsModalFormController.$inject = ['$scope', '$rootScope', '$state', '$window', '$uibModalInstance', 'GetCommMemberService', '$uibModal'];
  function JoinUsModalFormController($scope, $rootScope, $state, $window, $uibModalInstance, GetCommMemberService, $uibModal) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.formData = {};
    vm.ok = function(isValid) {
      vm.formData.name = vm.name;
      vm.formData.sex = vm.sex;
      vm.formData.address = vm.address;
      vm.formData.phone = vm.phone;
      vm.formData.reason = vm.reason;
      $uibModalInstance.close(vm.formData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
