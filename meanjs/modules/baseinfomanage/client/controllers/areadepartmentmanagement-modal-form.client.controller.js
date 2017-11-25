(function () {
  'use strict';

  angular
    .module('areadepartmentmanagement')
    .controller('AreadepartmentmanagementModalFormController', AreadepartmentmanagementModalFormController);

  AreadepartmentmanagementModalFormController.$inject = ['$window', '$scope', 'localStorageService', '$uibModalInstance', 'areadepartmentmanagementData', 'method', 'columnDefs', 'userCommId', 'partyleixing'];
  function AreadepartmentmanagementModalFormController($window, $scope, localStorageService, $uibModalInstance, areadepartmentmanagementData, method, columnDefs, userCommId, partyleixing) {
    var vm = this;
    vm.areadepartmentmanagementData = areadepartmentmanagementData;
    vm.method = method;
    vm.areadepartmentmanagementData.party = partyleixing;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.areadepartmentmanagementForm');
        return;
      }
      $uibModalInstance.close(vm.areadepartmentmanagementData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    if (partyleixing === 2) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
    } else if (partyleixing === 1) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
    }
    $scope.cvs = srr;
    if (method === '新增') {
      if (userCommId === '') {
        vm.areadepartmentmanagementData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.areadepartmentmanagementData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else if (method === '修改') {
      if (userCommId === '') {
        vm.areadepartmentmanagementData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.areadepartmentmanagementData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
  }
}());
