(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('GuardianMailboxModalFormController', GuardianMailboxModalFormController);

  GuardianMailboxModalFormController.$inject = ['$scope', '$uibModalInstance', 'guardianmailboxData', 'method'];
  function GuardianMailboxModalFormController($scope, $uibModalInstance, guardianmailboxData, method) {
    var vm = this;
    vm.guardianmailboxData = guardianmailboxData;
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
      vm.guardianmailboxData.sex = sexs[0].sexname;
    }
    if (method === '修改' || method === '查看') {
      vm.guardianmailboxData.birthday = new Date(guardianmailboxData.birthday);
    }
    //日期选择器
    $scope.today = function () {
      vm.guardianmailboxData.birthday = new Date();
    };
    $scope.clear = function () {
      vm.guardianmailboxData.birthday = null;
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
        $scope.$broadcast('show-errors-check-validity', 'vm.guardianmailboxForm');
        return;
      }
      if (vm.guardianmailboxData.content === undefined || vm.guardianmailboxData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      $uibModalInstance.close(vm.guardianmailboxData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
