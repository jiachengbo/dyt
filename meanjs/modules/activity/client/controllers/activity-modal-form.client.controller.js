(function () {
  'use strict';

  angular
    .module('activity')
    .controller('ActivityModalFormController', ActivityModalFormController);

  ActivityModalFormController.$inject = ['$scope', '$uibModalInstance', 'activityData', 'method'];
  function ActivityModalFormController($scope, $uibModalInstance, activityData, method) {
    var vm = this;
    vm.activityData = activityData;
    vm.method = method;
    vm.disabled = (method === 'view');

    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.activityForm');
        return;
      }
      $uibModalInstance.close(vm.activityData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
