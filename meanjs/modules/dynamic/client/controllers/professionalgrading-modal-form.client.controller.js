(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('ProfessionAlgradinginfoModalFormController', ProfessionAlgradinginfoModalFormController);

  ProfessionAlgradinginfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'ProfessionAlgradingData', 'method', 'partyid'];
  function ProfessionAlgradinginfoModalFormController($scope, $uibModalInstance, ProfessionAlgradingData, method, partyid) {
    var vm = this;
    vm.ProfessionAlgradingData = ProfessionAlgradingData;
    vm.ProfessionAlgradingData.party = partyid;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    if (method === '新增') {
      vm.iscreatedate = false;
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.ProfessionAlgradingForm');
        return;
      }
      if (vm.ProfessionAlgradingData.content === undefined || vm.ProfessionAlgradingData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.fileFile) {
        vm.ProfessionAlgradingData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.ProfessionAlgradingData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());