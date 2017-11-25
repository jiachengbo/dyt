(function () {
  'use strict';

  angular
    .module('unionInformationManagement')
    .controller('UnionInformationManagementModalFormController', UnionInformationManagementModalFormController);

  UnionInformationManagementModalFormController.$inject = ['$scope', '$uibModalInstance', 'unionInformationManagementData', 'method', 'columnDefs'];
  function UnionInformationManagementModalFormController($scope, $uibModalInstance, unionInformationManagementData, method, columnDefs) {
    var vm = this;
    vm.unionInformationManagementData = unionInformationManagementData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.unionInformationManagementForm');
        return;
      }
      $uibModalInstance.close(vm.unionInformationManagementData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
