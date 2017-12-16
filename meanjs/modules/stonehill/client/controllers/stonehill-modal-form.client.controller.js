(function () {
  'use strict';

  angular
    .module('stonehill')
    .controller('StonehillModalFormController', StonehillModalFormController);

  StonehillModalFormController.$inject = ['$scope', '$uibModalInstance', 'stonehillData', 'method'];
  function StonehillModalFormController($scope, $uibModalInstance, stonehillData, method) {
    var vm = this;
    vm.stonehillData = stonehillData;
    vm.method = method;
    vm.disabled = (method === 'view');
    if (vm.method === 'add') {
      vm.methodname = '新增';
    } else if (vm.method === 'update') {
      vm.methodname = '修改';
    } else if (vm.method === 'view') {
      vm.methodname = '查看';
    }
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.stonehillForm');
        return;
      }
      vm.stonehillData.photo = vm.create_photoPicFile;
      $uibModalInstance.close(vm.stonehillData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
