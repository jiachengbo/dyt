(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('PovertyAlleviationinfoModalFormController', PovertyAlleviationinfoModalFormController);

  PovertyAlleviationinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'PovertyAlleviationData', 'method', 'localStorageService', 'userCommId'];
  function PovertyAlleviationinfoModalFormController($scope, $uibModalInstance, PovertyAlleviationData, method, localStorageService, userCommId) {
    var vm = this;
    vm.PovertyAlleviationData = PovertyAlleviationData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //读取本地存储的社区类型表
    var sqList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    angular.forEach(sqList, function (value, key) {
      if (value.name[value.name.length - 1] === '村') {
        this.push(value);
      }
    }, srr);
    $scope.communityInfo = srr;
    if (method === '新增') {
      vm.iscreatedate = false;
      if (userCommId === '') {
        vm.PovertyAlleviationData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.PovertyAlleviationData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        vm.PovertyAlleviationData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.PovertyAlleviationData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.PovertyAlleviationForm');
        return;
      }
      if (vm.PovertyAlleviationData.content === undefined || vm.PovertyAlleviationData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.fileFile) {
        vm.PovertyAlleviationData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.PovertyAlleviationData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
