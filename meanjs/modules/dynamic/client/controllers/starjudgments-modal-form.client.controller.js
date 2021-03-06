(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('StarJudgmentsinfoModalFormController', StarJudgmentsinfoModalFormController);

  StarJudgmentsinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'StarJudgmentsData', 'method', 'partyid', '$window'];
  function StarJudgmentsinfoModalFormController($scope, $uibModalInstance, StarJudgmentsData, method, partyid, $window) {
    var vm = this;
    vm.StarJudgmentsData = StarJudgmentsData;
    vm.StarJudgmentsData.party = partyid;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    if (method === '新增') {
      vm.iscreatedate = false;
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (vm.fileFile) {
        if (vm.fileFile.name.slice(-4) !== 'html') {
          $window.alert('请将word文件进行转换');
          return;
        }
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.StarJudgmentsForm');
        return;
      }
      if (vm.StarJudgmentsData.content === undefined || vm.StarJudgmentsData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.fileFile) {
        vm.StarJudgmentsData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.StarJudgmentsData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
