(function () {
  'use strict';

  angular
    .module('organization')
    .controller('YLCAModalFormController', YLCAModalFormController);

  YLCAModalFormController.$inject = ['$scope', '$uibModalInstance', 'ylcaData', 'method', 'localStorageService'];
  function YLCAModalFormController($scope, $uibModalInstance, ylcaData, method, localStorageService) {
    var vm = this;
    vm.ylcaData = ylcaData;
    vm.method = method;
    vm.disabled = (method === '查看');
    //读取本地存储的团委活动类型常量表
    var cvsList = localStorageService.getItems('YLC_activitiesTypeTable');
    $scope.ylcaTypeInfo = cvsList;
    if (method === '新增') {
      if (cvsList.length > 0) {
        vm.ylcaData.activitiestype = cvsList[0].id;
      }
    }
    if (method === '修改' || method === '查看') {
      vm.ylcaData.activitiestime = new Date(ylcaData.activitiestime);
    }

    //日期选择器
    $scope.today = function () {
      vm.ylcaData.activitiestime = new Date();
    };
    $scope.clear = function () {
      vm.ylcaData.activitiestime = null;
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
        $scope.$broadcast('show-errors-check-validity', 'vm.ylcaForm');
        return;
      }
      if (vm.ylcaData.activitiescontent === undefined || vm.ylcaData.activitiescontent === '') {
        vm.yzActivitiescontent = true;
        return;
      } else {
        vm.yzActivitiescontent = false;
      }
      if (vm.picFile) {
        vm.ylcaData.activitiespic = vm.picFile;
      }
      if (vm.fileFile) {
        vm.ylcaData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.ylcaData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
