(function () {
  'use strict';

  angular
    .module('core')
    .controller('WeiQuanModalFormController', WeiQuanModalFormController);
  WeiQuanModalFormController.$inject = ['$scope', '$rootScope', '$state', '$window', '$uibModalInstance', 'GetCommMemberService', '$uibModal'];
  function WeiQuanModalFormController($scope, $rootScope, $state, $window, $uibModalInstance, GetCommMemberService, $uibModal) {
    var vm = this;
    $rootScope.$emit('state', $state.current.url);
    vm.formData = {};
    vm.ok = function() {
      vm.formData.name = vm.name;
      vm.formData.sex = vm.sex;
      vm.formData.phone = vm.phone;
      vm.formData.email = vm.email;
      vm.formData.address = vm.address;
      vm.formData.zhuti = vm.zhuti;
      vm.formData.content = vm.content;
      $uibModalInstance.close(vm.formData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
