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
    vm.sqcs = [];
    $scope.sqc = [];
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.partyBuildInstructorTableForm');
        return;
      }

      if (vm.photo) {
        vm.partyBuildInstructorTableData.photo = vm.photo;
      }
      // 每次 提交 所管理的社区，需要重写字段
      vm.partyBuildInstructorTableData.communityIds = '';
      vm.partyBuildInstructorTableData.communityIndexs = '';

      // 遍历 所管理的社区或者村子 id
      angular.forEach($scope.sqc, function (v, k) {
        if (v) {
          vm.partyBuildInstructorTableData.communityIds += ',' + vm.sqcs[k].id;
          vm.partyBuildInstructorTableData.communityIndexs += ',' + k;
        }
      });
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
    //  获取所管理的社区 或者 村 communityIds
    //读取本地存储的社区村常量表
    vm.cvsList = localStorageService.getItems('CommunityVillageConstant');
    var indexIds = vm.partyBuildInstructorTableData.communityIndexs;
    for (var b = 0; b < vm.cvsList.length; b++) {
      if (party === 1) {
        //  社区党建
        if (vm.cvsList[b].name.match('社区')) {
          vm.sqcs.push({name: vm.cvsList[b].name, id: vm.cvsList[b].id});
          $scope.sqc.push(false);//全部默认不选任何社区
          // 循环赋值 所选
          if (method === '修改' || method === '浏览') {
            // var indexIds = vm.partyBuildInstructorTableData.communityIndexs;
            if (indexIds !== null && indexIds !== '' && indexIds !== undefined) {
              var indexs = indexIds.split(',');
              for (var k = 0; k < indexs.length; k++) {
                if (indexs[k] !== '' && indexs[k] !== undefined) {
                  $scope.sqc[indexs[k]] = true;
                }
              }
            }
          }
        }
      } else if (party === 2) {
        //  农村党建
        if (vm.cvsList[b].name.match('村')) {
          vm.sqcs.push({name: vm.cvsList[b].name, id: vm.cvsList[b].id});
          $scope.sqc.push(false);//全部默认不选任何社区
          // 循环赋值 所选
          if (method === '修改' || method === '浏览') {
            // var indexIds = vm.partyBuildInstructorTableData.communityIndexs;
            if (indexIds !== null && indexIds !== '' && indexIds !== undefined) {
              var indexs_c = indexIds.split(',');
              for (var kc = 0; kc < indexs_c.length; kc++) {
                if (indexs_c[kc] !== '' && indexs_c[kc] !== undefined) {
                  $scope.sqc[indexs_c[kc]] = true;
                }
              }
            }
          }
        }
      }
      /*
       if (vm.cvsList[b].name.match('村') || vm.cvsList[b].name.match('社区')) {
       vm.sqcs.push({name: vm.cvsList[b].name, id: vm.cvsList[b].id});
       $scope.sqc.push(false);//全部默认不选任何社区
       // 循环赋值 所选
       if (method === '修改' || method === '浏览') {
       var indexIds = vm.partyBuildInstructorTableData.communityIndexs;
       if (indexIds !== null && indexIds !== '' && indexIds !== undefined) {
       var indexs = indexIds.split(',');
       for (var k = 0; k < indexs.length; k++) {
       if (indexs[k] !== "" && indexs[k] !== undefined) {
       $scope.sqc[indexs[k]] = true;
       }
       }
       }
       }
       }*/

    }
  }
}());
