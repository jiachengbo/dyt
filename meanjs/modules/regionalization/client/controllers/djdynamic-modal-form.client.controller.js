(function () {
  'use strict';

  angular
    .module('regionalization')
    .controller('DjdynamicModalFormController', DjdynamicModalFormController);

  DjdynamicModalFormController.$inject = ['$scope', '$uibModalInstance', 'dynamicData', 'method', 'localStorageService', 'userCommId', 'party', '$window'];
  function DjdynamicModalFormController($scope, $uibModalInstance, dynamicData, method, localStorageService, userCommId, party, $window) {
    var vm = this;
    vm.dynamicData = dynamicData;
    vm.method = method;
    vm.disabled = (method === '查看');
    //状态下拉框
    var states = [
      {'stateName': '正在上报'},
      {'stateName': '处理中'},
      {'stateName': '已完成'}
    ];
    $scope.stateInfo = states;
    //类型下拉框
    var current_pt_typeName = [
      {'current_pt_typeName': '城市党建'},
      {'current_pt_typeName': '农村党建'},
      {'current_pt_typeName': '非公党建'},
      {'current_pt_typeName': '机关党建'},
      {'current_pt_typeName': '社会组织党建'}
    ];
    $scope.current_pt_typeInfo = current_pt_typeName;

    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    if (party === '农村党建') {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
    } else if (party === '城市党建') {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
    } else {
      srr = cvsList;
    }
    $scope.communityInfo = srr;
    // $scope.communityInfo = cvsList;
    //读取本地存储的网格常量表
    var gridList = localStorageService.getItems('GridTable');
    var arr = [];
    vm.shequid = function (num) {
      arr = [];
      angular.forEach(gridList, function (value, key) {
        if (num === value.communityid) {
          this.push(value);
        }
      }, arr);
      if (arr.length > 0) {
        $scope.gridInfo = arr;
      } else {
        $scope.gridInfo = [{'id': 69, 'name': '无', 'communityid': 0}];
      }
    };
    if (method === '新增') {
      vm.dynamicData.state = states[0].stateName;
      vm.dynamicData.type = current_pt_typeName[0].current_pt_typeName;
      if (gridList.length > 0) {
        vm.dynamicData.gridid = gridList[0].id;
      }
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.dynamicData.communityid = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        vm.dynamicData.communityid = parseInt(userCommId, 0);
        arr = [];
        angular.forEach(gridList, function (value, key) {
          if (vm.dynamicData.communityid === value.communityid) {
            this.push(value);
          }
        }, arr);
        if (arr.length > 0) {
          $scope.gridInfo = arr;
        } else {
          $scope.gridInfo = [{'id': 69, 'name': '无', 'communityid': 0}];
        }
        vm.userCommId = true;
      }
    } else {
      vm.dynamicData.state = dynamicData.state;
      vm.dynamicData.current_pt_type = dynamicData.current_pt_type;
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.dynamicData.communityid = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        arr = [];
        vm.dynamicData.communityid = parseInt(userCommId, 0);
        angular.forEach(gridList, function (value, key) {
          if (vm.dynamicData.communityid === value.communityid) {
            this.push(value);
          }
        }, arr);
        if (arr.length > 0) {
          $scope.gridInfo = arr;
        } else {
          $scope.gridInfo = [{'id': 69, 'name': '无', 'communityid': 0}];
        }
        vm.userCommId = true;
      }
    }
    vm.dynamicData.type = party;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (vm.fileFile.name.slice(-4) !== 'html') {
        $window.alert('请将word文件进行转换');
        return;
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.dynamicForm');
        return;
      }
      if (vm.dynamicData.dynamiccontext === undefined || vm.dynamicData.dynamiccontext === '') {
        vm.yzDynamiccontext = true;
        return;
      } else {
        vm.yzDynamiccontext = false;
      }
      if (vm.picFile1) {
        vm.dynamicData.photoone = vm.picFile1;
      }
      if (vm.picFile2) {
        vm.dynamicData.phototwo = vm.picFile2;
      }
      if (vm.picFile3) {
        vm.dynamicData.photothree = vm.picFile3;
      }
      if (vm.fileFile) {
        vm.dynamicData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.dynamicData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
