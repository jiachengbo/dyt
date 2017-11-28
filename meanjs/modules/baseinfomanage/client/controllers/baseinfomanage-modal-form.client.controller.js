(function () {
  'use strict';

  angular
    .module('baseinfomanage')
    .controller('BaseinfomanageModalFormController', BaseinfomanageModalFormController);

  BaseinfomanageModalFormController.$inject = ['$scope', '$uibModalInstance', 'baseinfomanageData', 'method'];
  function BaseinfomanageModalFormController($scope, $uibModalInstance, baseinfomanageData, method) {
    var vm = this;
    vm.baseinfomanageData = baseinfomanageData;
    vm.method = method;
    vm.disabled = (method === 'view');

    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.baseinfomanageForm');
        return;
      }
      $uibModalInstance.close(vm.baseinfomanageData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
