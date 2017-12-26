(function () {
  'use strict';

  angular
    .module('publicproject')
    .controller('PublicprojectModalFormController', PublicprojectModalFormController);

  PublicprojectModalFormController.$inject = ['$scope', '$uibModalInstance', 'publicprojectData', 'method', 'localStorageService'];
  function PublicprojectModalFormController($scope, $uibModalInstance, publicprojectData, method, localStorageService) {
    var vm = this;
    vm.publicprojectData = publicprojectData;
    vm.publicprojectData.projecttype = '党群建设';
    vm.publicprojectData.community = '武警医院社区';
    vm.CommunityV = localStorageService.getItems('CommunityVillageConstant');
    vm.method = method;
    vm.disabled = (method === 'view');
    if (vm.method === 'add') {
      vm.methodname = '新增';
    } else if (vm.method === 'updata') {
      vm.methodname = '修改';
    } else if (vm.method === 'view') {
      vm.methodname = '查看';
    }
    // //日期选择器
    // $scope.today = function () {
    //   var now = new Date();
    //   now.setDate(1);
    //   if (vm.method === 'add') {
    //     $scope.dt1 = new Date();
    //     $scope.dt2 = new Date();
    //   } else {
    //     $scope.dt1 = new Date(vm.publicprojectData.sbtime);
    //     $scope.dt2 = new Date(vm.publicprojectData.endtime);
    //   }
    // };
    // $scope.today();
    // $scope.clear = function () {
    //   $scope.dt1 = null;
    //   $scope.dt2 = null;
    // };
    //
    // $scope.inlineOptions = {
    //   customClass: getDayClass,
    //   minDate: new Date(),
    //   showWeeks: true
    // };
    //
    // $scope.toggleMin = function () {
    //   $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    // };
    //
    // $scope.toggleMin();
    // $scope.open1 = function () {
    //   $scope.popup1.opened = true;
    // };
    //
    // $scope.open2 = function () {
    //   $scope.popup2.opened = true;
    // };
    //
    // $scope.popup1 = {
    //   opened: false
    // };
    //
    // $scope.popup2 = {
    //   opened: false
    // };
    //
    // var tomorrow = new Date();
    // tomorrow.setDate(tomorrow.getDate() + 1);
    // var afterTomorrow = new Date();
    // afterTomorrow.setDate(tomorrow.getDate() + 1);
    // $scope.events = [
    //   {
    //     date: tomorrow,
    //     status: 'full'
    //   },
    //   {
    //     date: afterTomorrow,
    //     status: 'partially'
    //   }
    // ];
    //
    // function getDayClass(data) {
    //   var date = data.date,
    //     mode = data.mode;
    //   if (mode === 'day') {
    //     var dayToCheck = new Date(date).setHours(0, 0, 0, 0);
    //
    //     for (var i = 0; i < $scope.events.length; i++) {
    //       var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);
    //
    //       if (dayToCheck === currentDay) {
    //         return $scope.events[i].status;
    //       }
    //     }
    //   }
    //   return '';
    // }
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.publicprojectForm');
        return;
      }
      // if (vm.methodname === '新增' || vm.methodname === '修改') {
      //   vm.publicprojectData.sbtime = $scope.dt1;
      //   vm.publicprojectData.endtime = $scope.dt2;
      // }
      $uibModalInstance.close(vm.publicprojectData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
