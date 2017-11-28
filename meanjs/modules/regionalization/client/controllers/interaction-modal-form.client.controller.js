(function () {
  'use strict';

  angular
    .module('regionalization')
    .controller('InteractionModalFormController', InteractionModalFormController);

  InteractionModalFormController.$inject = ['$scope', '$uibModalInstance', 'interactionData', 'method', 'localStorageService', 'userCommId', 'partyid'];
  function InteractionModalFormController($scope, $uibModalInstance, interactionData, method, localStorageService, userCommId, partyid) {
    var vm = this;
    vm.interactionData = interactionData;
    vm.interactionData.party = partyid;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');

    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    var srr = [];
    if (partyid === 2) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name[value.name.length - 1] === '村') {
          this.push(value);
        }
      }, srr);
      $scope.communityInfo = srr;
    } else if (partyid === 1) {
      angular.forEach(cvsList, function (value, key) {
        if (value.name.indexOf('社区') !== -1) {
          this.push(value);
        }
      }, srr);
      $scope.communityInfo = srr;
    } else {
      $scope.communityInfo = cvsList;
    }
    if (method === '新增') {
      vm.iscreatedate = false;
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.interactionData.communityid = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        vm.interactionData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    } else {
      if (userCommId === '') {
        if (cvsList.length > 0) {
          vm.interactionData.communityid = cvsList[0].id;
        }
        vm.userCommId = false;
      } else {
        vm.interactionData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.interactionForm');
        return;
      }
      if (vm.interactionData.problem === undefined || vm.interactionData.problem === '') {
        vm.yzProblem = true;
        return;
      } else {
        vm.yzProblem = false;
      }
      $uibModalInstance.close(vm.interactionData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
