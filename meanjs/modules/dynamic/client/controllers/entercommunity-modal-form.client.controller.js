(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('EnterCommunityinfoModalFormController', EnterCommunityinfoModalFormController);

  EnterCommunityinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'EnterCommunityData', 'method', 'localStorageService', 'userCommId', '$window'];
  function EnterCommunityinfoModalFormController($scope, $uibModalInstance, EnterCommunityData, method, localStorageService, userCommId, $window) {
    var vm = this;
    vm.EnterCommunityData = EnterCommunityData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //读取本地存储的社区类型表
    var sqList = localStorageService.getItems('CommunityVillageConstant');
    $scope.communityInfo = sqList;
    if (method === '新增') {
      vm.iscreatedate = false;
      if (userCommId === '') {
        vm.EnterCommunityData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.EnterCommunityData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        vm.EnterCommunityData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.EnterCommunityData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
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
        $scope.$broadcast('show-errors-check-validity', 'vm.EnterCommunityForm');
        return;
      }
      if (vm.EnterCommunityData.content === undefined || vm.EnterCommunityData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.fileFile) {
        vm.EnterCommunityData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.EnterCommunityData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
