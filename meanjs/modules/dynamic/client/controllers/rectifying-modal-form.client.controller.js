(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('RectifyinginfoModalFormController', RectifyinginfoModalFormController);

  RectifyinginfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'RectifyingData', 'method', 'localStorageService', 'userCommId', '$window'];
  function RectifyinginfoModalFormController($scope, $uibModalInstance, RectifyingData, method, localStorageService, userCommId, $window) {
    var vm = this;
    vm.RectifyingData = RectifyingData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //读取本地存储的社区类型表
    var sqList = localStorageService.getItems('CommunityVillageConstant');
    $scope.communityInfo = sqList;
    if (method === '新增') {
      vm.iscreatedate = false;
      if (userCommId === '') {
        vm.RectifyingData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.RectifyingData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        vm.RectifyingData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.RectifyingData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
//在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (vm.fileFile.name.slice(-4) !== 'html') {
        $window.alert('请将word文件进行转换');
        return;
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.RectifyingForm');
        return;
      }
      if (vm.RectifyingData.mainproblem === undefined || vm.RectifyingData.mainproblem === '') {
        vm.yzMainProblem = true;
        return;
      } else {
        vm.yzMainProblem = false;
      }
      if (vm.RectifyingData.Measures === undefined || vm.RectifyingData.Measures === '') {
        vm.yzMeasures = true;
        return;
      } else {
        vm.yzMeasures = false;
      }
      if (vm.fileFile) {
        vm.RectifyingData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.RectifyingData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
