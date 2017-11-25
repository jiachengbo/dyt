(function () {
  'use strict';

  angular
    .module('partyBuildInstructorTable')
    .controller('PartyBuildInstructorMemTableModalFormController', PartyBuildInstructorMemTableModalFormController);

  PartyBuildInstructorMemTableModalFormController.$inject = ['$scope', '$uibModalInstance', 'partyBuildInstructorTableData', 'method', 'columnDefs', 'localStorageService', 'userCommId', 'party'];
  function PartyBuildInstructorMemTableModalFormController($scope, $uibModalInstance, partyBuildInstructorTableData, method, columnDefs, localStorageService, userCommId, party) {
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

      if (vm.photo) {
        vm.partyBuildInstructorTableData.photo = vm.photo;
      }

      $uibModalInstance.close(vm.partyBuildInstructorTableData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //----------性别-----------
    var sexs = [{'name': '男'}, {'name': '女'}];
    $scope.sexs = sexs;
    if (method === '新增') {
      vm.partyBuildInstructorTableData.sex = $scope.sexs[0].name;
    }
  }
}());
