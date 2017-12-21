(function () {
  'use strict';

  angular
    .module('policy')
    .controller('PolicyModalFormController', PolicyModalFormController);

  PolicyModalFormController.$inject = ['$scope', '$uibModalInstance', 'policyData', 'method', '$window'];
  function PolicyModalFormController($scope, $uibModalInstance, policyData, method, $window) {
    var vm = this;
    vm.policyData = policyData;
    vm.method = method;
    vm.disabled = (method === '查看');
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (vm.fileFile) {
        if (vm.fileFile.name.slice(-4) !== 'html') {
          $window.alert('请将word文件进行转换');
          return;
        }
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.policyForm');
        return;
      }
      if (vm.fileFile) {
        vm.policyData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.policyData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
