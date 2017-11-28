(function () {
  'use strict';

  angular
    .module('partyBuildInstructorTable')
    .controller('PartyBuildInstructorTableModalFormController', PartyBuildInstructorTableModalFormController);

  PartyBuildInstructorTableModalFormController.$inject = ['$scope', '$uibModalInstance', 'partyBuildInstructorTableData', 'method', 'columnDefs', 'localStorageService', 'userCommId', 'party'];
  function PartyBuildInstructorTableModalFormController($scope, $uibModalInstance, partyBuildInstructorTableData, method, columnDefs, localStorageService, userCommId, party) {
    var vm = this;
    vm.partyBuildInstructorTableData = partyBuildInstructorTableData;
    vm.partyBuildInstructorTableData.party = party;
    vm.method = method;
    // 从list传入modal 党建类型 Id ,读取本地常量表 中对应党建类型 Id
    vm.partyorg = localStorageService.getItems('PartyOrganizationUnitTypeConstant');
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.partyBuildInstructorTableForm');
        return;
      }
      $uibModalInstance.close(vm.partyBuildInstructorTableData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //----------类别：非公企业 or 社会组织-----------
    var cvs = [{'name': '非公企业'}, {'name': '社会组织'}];
    $scope.cvs = cvs;
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    if (party === 2) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
    } else if (party === 1) {
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
    if (method === '新增') {
      vm.partyBuildInstructorTableData.type_style = cvs[0].name;
      if (userCommId === '') {
        vm.partyBuildInstructorTableData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.partyBuildInstructorTableData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else if (method === '修改') {
      vm.partyBuildInstructorTableData.type_style = partyBuildInstructorTableData.type_style;
      if (userCommId === '') {
        vm.partyBuildInstructorTableData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.partyBuildInstructorTableData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
  }
}());
