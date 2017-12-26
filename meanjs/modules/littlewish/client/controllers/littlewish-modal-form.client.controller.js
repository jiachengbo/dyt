(function () {
  'use strict';

  angular
    .module('littlewish')
    .controller('LittlewishModalFormController', LittlewishModalFormController);

  LittlewishModalFormController.$inject = ['$scope', '$uibModalInstance', 'littlewishData', 'method', 'localStorageService', '$window', 'Authentication'];
  function LittlewishModalFormController($scope, $uibModalInstance, littlewishData, method, localStorageService, $window, Authentication) {
    var vm = this;
    vm.littlewishData = littlewishData;
    vm.userIdCard = Authentication.user.IDcard;
    console.log(vm.littlewishData);
    if (vm.littlewishData.state === '待认领') {
    //  自己不能认领自己的微心愿
      if (vm.littlewishData.IDcard === vm.userIdCard) {
        vm.renling1 = true;
      } else {
        vm.renling1 = false;
      }
    } else if (vm.littlewishData.state === '实施中') {
    //  别人不能完成不是自己的认领的微心愿
      if (vm.userIdCard !== vm.littlewishData.claimpersonID) {
        vm.ended1 = true;
      } else {
        vm.ended1 = false;
      }
    }
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
    if (vm.littlewishData.state === '待审核') {
      vm.Auditstate = true;
    }
    if (vm.littlewishData.state === '已完成') {
      vm.ended = true;
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.littlewishForm');
        return;
      }
      $uibModalInstance.close(vm.littlewishData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
