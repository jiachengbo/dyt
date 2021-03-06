(function () {
  'use strict';

  angular
    .module('activitysquare')
    .controller('ActivitysquareModalFormController', ActivitysquareModalFormController);

  ActivitysquareModalFormController.$inject = ['$scope', '$uibModalInstance', 'activitysquareData', 'method', 'Authentication', 'ActivitcService', 'Notification', 'mecanyu'];
  function ActivitysquareModalFormController($scope, $uibModalInstance, activitysquareData, method, Authentication, ActivitcService, Notification, mecanyu) {
    var vm = this;

    // if (Authentication.user) {
    //   vm.idcard = Authentication.user.IDcard;
    //   vm.grade = Authentication.user.roles.indexOf('partym');
    //   if (vm.grade > 0) {
    //     vm.partyshow = false;
    //   } else {
    //     vm.partyshow = true;
    //   }
    // }
    vm.activitysquareData = activitysquareData;
    vm.method = method;
    if (vm.method !== 'add') {
      vm.mecanyu = mecanyu;
    }
    vm.disabled = (method === 'view');
    if (vm.method === 'add') {
      vm.methodname = '新增';
    } else if (vm.methodname === 'view') {
      vm.methodname = '查看';
    } else if (vm.methodname === 'update') {
      vm.methodname = '更新';
    }

    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.activitysquareForm');
        return;
      }
      $uibModalInstance.close(vm.activitysquareData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //日期选择器
    $scope.today = function () {
      var now = new Date();
      now.setDate(1);
      if (vm.method === 'add') {
        vm.activitysquareData.fbtime = new Date();
        vm.activitysquareData.starttime = new Date();
        vm.activitysquareData.endtime = new Date();
        vm.activitysquareData.applytime = new Date();
        vm.activitysquareData.applyendtime = new Date();
      } else if (vm.method === 'view' || vm.method === 'update') {
        vm.activitysquareData.fbtime = new Date(vm.activitysquareData.fbtime);
        vm.activitysquareData.starttime = new Date(vm.activitysquareData.starttime);
        vm.activitysquareData.endtime = new Date(vm.activitysquareData.endtime);
        vm.activitysquareData.applytime = new Date(vm.activitysquareData.applytime);
        vm.activitysquareData.applyendtime = new Date(vm.activitysquareData.applyendtime);
      }
    };
    $scope.today();
    $scope.clear = function () {
      vm.activitysquareData.fbtime = null;
      vm.activitysquareData.starttime = null;
      vm.activitysquareData.endtime = null;
      vm.activitysquareData.applytime = null;
      vm.activitysquareData.applyendtime = null;
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
    // 发布时间
    $scope.open1 = function () {
      $scope.popup1.opened = true;
    };
    // 开始时间
    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };
    // 结束时间
    $scope.open3 = function () {
      $scope.popup3.opened = true;
    };
    // 报名开始时间
    $scope.open4 = function () {
      $scope.popup4.opened = true;
    };
    // 报名开始时间
    $scope.open5 = function () {
      $scope.popup5.opened = true;
    };
    $scope.popup1 = {
      opened: false
    };
    $scope.popup2 = {
      opened: false
    };
    $scope.popup3 = {
      opened: false
    };
    $scope.popup4 = {
      opened: false
    };
    $scope.popup5 = {
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
    vm.active = function () {
      var obj = new ActivitcService();
      obj.userid = Authentication.user.id;
      obj.activitID = vm.activitysquareData.id;
      ActivitcService.query(obj).$promise.then(function (data) {
        if (data) {
          $uibModalInstance.close(1);
          Notification.success({message: '<i class="glyphicon glyphicon-ok"></i> 参与成功!'});
        }
      });
    };
  }
}());
