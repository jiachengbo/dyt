(function () {
  'use strict';

  angular
    .module('applyNow')
    .controller('ApplyNowModalFormController', ApplyNowModalFormController);

  ApplyNowModalFormController.$inject = ['$scope', '$uibModalInstance', 'applyNowData', 'method', 'localStorageService'];
  function ApplyNowModalFormController($scope, $uibModalInstance, applyNowData, method, localStorageService) {
    var vm = this;
    vm.applyNowData = applyNowData;
    vm.partyzhibu = localStorageService.getItems('PartyOrganizationTable');
    if (method === '增加') {
      vm.applyNowData.zhuangtai = '已预约';
      vm.yuyue = true;
      // angular.element(document.querySelector('.modal-footer>button:nth-of-type(1)'))[0].innerHTML = '确认';
    } else if (method === 'update') {
      vm.applyNowData.zhuangtai = '预约已通知';
      vm.yuyue = false;
      // angular.element(document.querySelector('.modal-footer>button:nth-of-type(1)'))[0].innerHTML = '预约通知';
    }
    vm.method = method;
    vm.disabled = (method === 'view');
    var cvs_sex = [{'name': '男'}, {'name': '女'}];
    $scope.cvs_sex = cvs_sex;
    var cvs_nation = localStorageService.getItems('NationConstant');
    $scope.cvs_nation = cvs_nation;
    var cvs_nation_place = localStorageService.getItems('NationPlaceConstant');
    $scope.cvs_nation_place = cvs_nation_place;
    $scope.cvs_party_branch = vm.partyzhibu;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.applyNowForm');
        return;
      }
      console.log(vm.applyNowData.zhuangtai);
      $uibModalInstance.close(vm.applyNowData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    $scope.today = function () {
      vm.applyNowData.brith = new Date(applyNowData.brith);
      vm.applyNowData.partytime = new Date(applyNowData.partytime);
    };
    $scope.today();
    $scope.clear = function () {
      vm.applyNowData.brith = null;
      vm.applyNowData.partytime = null;
    };
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };
    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };
    $scope.popup1 = {
      opened: false
    };
    $scope.popup2 = {
      opened: false
    };
  }
}());
