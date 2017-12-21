(function () {
  'use strict';

  angular
    .module('littlewish')
    .controller('LittlewishModalFormController', LittlewishModalFormController);

  LittlewishModalFormController.$inject = ['$scope', '$uibModalInstance', 'littlewishData', 'method'];
  function LittlewishModalFormController($scope, $uibModalInstance, littlewishData, method) {
    var vm = this;
    vm.littlewishData = littlewishData;
    vm.method = method;
    vm.disabled = (method === 'view');
    if (vm.method === 'add') {
      vm.methodname = '新增';
    } else if (vm.method === 'view') {
      vm.methodname = '查看';
    } else if (vm.method === 'update') {
      vm.methodname = '修改';
    }
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.littlewishForm');
        return;
      }
      $uibModalInstance.close(vm.littlewishData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
