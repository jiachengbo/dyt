(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('ThreeServiceinfoModalFormController', ThreeServiceinfoModalFormController);

  ThreeServiceinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'ThreeServiceData', 'method', 'localStorageService', 'userCommId'];
  function ThreeServiceinfoModalFormController($scope, $uibModalInstance, ThreeServiceData, method, localStorageService, userCommId) {
    var vm = this;
    vm.ThreeServiceData = ThreeServiceData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //读取本地存储的三务公开类型表
    var cvsList = localStorageService.getItems('ThreeServiceTypeTable');
    $scope.typeInfo = cvsList;
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
      if (cvsList.length > 0) {
        vm.ThreeServiceData.type = cvsList[0].id;
      }
      if (userCommId === '') {
        vm.ThreeServiceData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.ThreeServiceData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        vm.ThreeServiceData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.ThreeServiceData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.ThreeServiceForm');
        return;
      }
      if (vm.ThreeServiceData.content === undefined || vm.ThreeServiceData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.picFile) {
        vm.ThreeServiceData.photos = vm.picFile;
      }
      if (vm.fileFile) {
        vm.ThreeServiceData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.ThreeServiceData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
