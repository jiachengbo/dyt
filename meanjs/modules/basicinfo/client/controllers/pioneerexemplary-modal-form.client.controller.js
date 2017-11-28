(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('PioneerExemplaryModalFormController', PioneerExemplaryModalFormController);

  PioneerExemplaryModalFormController.$inject = ['$scope', '$uibModalInstance', 'pioneerexemplaryData', 'method', 'localStorageService', 'userCommId'];
  function PioneerExemplaryModalFormController($scope, $uibModalInstance, pioneerexemplaryData, method, localStorageService, userCommId) {
    var vm = this;
    vm.pioneerexemplaryData = pioneerexemplaryData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //性别下拉框
    var sexs = [
      {'sexname': '男'},
      {'sexname': '女'}
    ];
    vm.leixing = [
      '基层党务工作者',
      '巾帼妇女风采',
      '劳模风采',
      '身边榜样'
    ];
    $scope.sexInfo = sexs;
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    $scope.commInfo = cvsList;
    if (method === '新增') {
      vm.iscreatedate = false;
      vm.pioneerexemplaryData.sex = sexs[0].sexname;
      if (userCommId === '') {
        vm.pioneerexemplaryData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.pioneerexemplaryData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        vm.pioneerexemplaryData.communityid = cvsList[0].id;
        vm.userCommId = false;
      } else {
        vm.pioneerexemplaryData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.pioneerexemplaryForm');
        return;
      }
      if (vm.pioneerexemplaryData.deeds === undefined || vm.pioneerexemplaryData.deeds === '') {
        vm.yzDeeds = true;
        return;
      } else {
        vm.yzDeeds = false;
      }
      if (vm.picFile) {
        vm.pioneerexemplaryData.photos = vm.picFile;
      }
      $uibModalInstance.close(vm.pioneerexemplaryData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
