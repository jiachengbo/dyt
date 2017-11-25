(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('LearningDynamicsinfoModalFormController', LearningDynamicsinfoModalFormController);

  LearningDynamicsinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'LearningDynamicsData', 'method', 'localStorageService', 'userCommId', 'partyid'];
  function LearningDynamicsinfoModalFormController($scope, $uibModalInstance, LearningDynamicsData, method, localStorageService, userCommId, partyid) {
    var vm = this;
    vm.LearningDynamicsData = LearningDynamicsData;
    vm.LearningDynamicsData.party = partyid;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //读取本地存储的社区类型表
    var sqList = localStorageService.getItems('CommunityVillageConstant');
    // $scope.communityInfo = sqList;
    var srr = [];
    if (partyid === 1) {
      angular.forEach(sqList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
    }
    $scope.communityInfo = srr;
    if (method === '新增') {
      vm.iscreatedate = false;
      if (userCommId === '') {
        vm.LearningDynamicsData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.LearningDynamicsData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        vm.LearningDynamicsData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.LearningDynamicsData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.LearningDynamicsForm');
        return;
      }
      if (vm.LearningDynamicsData.content === undefined || vm.LearningDynamicsData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.picFile) {
        vm.LearningDynamicsData.photos = vm.picFile;
      }
      if (vm.fileFile) {
        vm.LearningDynamicsData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.LearningDynamicsData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
