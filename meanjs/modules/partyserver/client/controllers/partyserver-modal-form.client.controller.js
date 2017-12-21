(function () {
  'use strict';

  angular
    .module('partyserver')
    .controller('PartyserverModalFormController', PartyserverModalFormController);

  PartyserverModalFormController.$inject = ['$scope', '$uibModalInstance', 'partyserverData', 'method'];
  function PartyserverModalFormController($scope, $uibModalInstance, partyserverData, method) {
    var vm = this;
    vm.partyserverData = partyserverData;
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
        $scope.$broadcast('show-errors-check-validity', 'vm.partyserverForm');
        return;
      }
      $uibModalInstance.close(vm.partyserverData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
