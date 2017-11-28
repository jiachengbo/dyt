(function () {
  'use strict';

  angular
    .module('stationUnitManagement')
    .controller('StationUnitManagementModalFormController', StationUnitManagementModalFormController);

  StationUnitManagementModalFormController.$inject = ['$scope', '$uibModalInstance',
    'stationUnitManagementData', 'method', 'columnDefs'];
  function StationUnitManagementModalFormController($scope, $uibModalInstance,
                                                    stationUnitManagementData, method, columnDefs) {
    var vm = this;
    vm.stationUnitManagementData = stationUnitManagementData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;

    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.stationUnitManagementForm');
        return;
      }
      $uibModalInstance.close(vm.stationUnitManagementData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
