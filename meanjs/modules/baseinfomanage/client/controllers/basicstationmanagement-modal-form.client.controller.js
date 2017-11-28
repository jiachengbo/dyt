(function () {
  'use strict';

  angular
    .module('basicStationManagement')
    .controller('BasicStationManagementModalFormController', BasicStationManagementModalFormController);

  BasicStationManagementModalFormController.$inject = ['$scope', '$uibModalInstance', 'basicStationManagementData', 'method', 'columnDefs'];
  function BasicStationManagementModalFormController($scope, $uibModalInstance, basicStationManagementData, method, columnDefs) {
    var vm = this;
    vm.basicStationManagementData = basicStationManagementData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.basicStationManagementForm');
        return;
      }
      $uibModalInstance.close(vm.basicStationManagementData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
