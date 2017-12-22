(function () {
  'use strict';

  angular
    .module('littlewish')
    .controller('LittlewishModalFormController', LittlewishModalFormController);

  LittlewishModalFormController.$inject = ['$scope', '$uibModalInstance', 'littlewishData', 'method', 'localStorageService', '$window'];
  function LittlewishModalFormController($scope, $uibModalInstance, littlewishData, method, localStorageService, $window) {
    var vm = this;
    vm.littlewishData = littlewishData;
    console.log(vm.littlewishData);
    vm.CommunityV = localStorageService.getItems('CommunityVillageConstant');
    vm.method = method;
    vm.disabled = (method === 'view');
    if (vm.method === 'add') {
      vm.methodname = '新增';
    } else if (vm.method === 'view') {
      vm.renling = (littlewishData.state !== '待认领' ? true : false);
      vm.littlewishData.community = $window.parseInt(vm.littlewishData.community);
      vm.methodname = '查看';
    } else if (vm.method === 'update') {
      vm.littlewishData.community = $window.parseInt(vm.littlewishData.community);
      vm.methodname = '修改';
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.littlewishForm');
        return;
      }
      console.log(vm.littlewishData);
      $uibModalInstance.close(vm.littlewishData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
