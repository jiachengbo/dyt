(function () {
  'use strict';

  angular
    .module('sysparam')
    .controller('SysparamModalFormController', SysparamModalFormController);

  SysparamModalFormController.$inject = ['$scope', '$log', '$uibModalInstance', 'sysparamData', 'method'];
  function SysparamModalFormController($scope, $log, $uibModalInstance, sysparamData, method) {
    var vm = this;
    vm.sysparamData = sysparamData;
    //字段是json 内容
    vm.sysparamData.data = vm.sysparamData.data ? JSON.stringify(vm.sysparamData.data) : null;
    vm.method = method;
    vm.disabled = (method === 'view');

    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.sysparamForm');
        return;
      }
      //字段是json 内容，转回对象
      try {
        vm.sysparamData.data = JSON.parse(vm.sysparamData.data);
      } catch (err) {
        $log.debug('input data %s not json', vm.sysparamData.data);
      }
      $uibModalInstance.close(vm.sysparamData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
