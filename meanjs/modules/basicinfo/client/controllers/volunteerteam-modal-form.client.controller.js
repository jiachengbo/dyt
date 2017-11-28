(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('VolunteerTeamModalFormController', VolunteerTeamModalFormController);

  VolunteerTeamModalFormController.$inject = ['$scope', '$uibModalInstance', 'volitionteamData', 'method'];
  function VolunteerTeamModalFormController($scope, $uibModalInstance, volitionteamData, method) {
    var vm = this;
    vm.volitionteamData = volitionteamData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //性别下拉框
    var sexs = [
      {'sexname': '男'},
      {'sexname': '女'}
    ];
    $scope.sexInfo = sexs;
    if (method === '新增') {
      vm.iscreatedate = false;
      vm.volitionteamData.sex = sexs[0].sexname;
    }
    if (method === '修改' || method === '查看') {
      vm.volitionteamData.birthday = new Date(volitionteamData.birthday);
    }
    //日期选择器
    $scope.today = function () {
      vm.volitionteamData.birthday = new Date();
    };
    $scope.clear = function () {
      vm.volitionteamData.birthday = null;
    };

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.toggleMin = function () {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
      return '';
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.volitionteamForm');
        return;
      }
      if (vm.volitionteamData.reasonsforjoining === undefined || vm.volitionteamData.reasonsforjoining === '') {
        vm.yzReasonsforjoining = true;
        return;
      } else {
        vm.yzReasonsforjoining = false;
      }
      $uibModalInstance.close(vm.volitionteamData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
