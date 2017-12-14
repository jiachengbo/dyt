(function () {
  'use strict';

  angular
    .module('dynamic')
    .controller('julacinfovmdalFormController', julacinfovmdalFormController);

  julacinfovmdalFormController.$inject = ['$scope', '$log', '$uibModalInstance', 'julacData', 'method', 'localStorageService', 'userCommId', '$window'];
  function julacinfovmdalFormController($scope, $log, $uibModalInstance, julacData, method, localStorageService, userCommId, $window) {
    var vm = this;
    vm.julacData = julacData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //读取本地存储的社区类型表
    var sqList = localStorageService.getItems('CommunityVillageConstant');
    var arr = [];
    angular.forEach(sqList, function (value, key) {
      if (value.name.indexOf('社区') !== -1) {
        this.push(value);
      }
    }, arr);
    $scope.communityInfo = arr;
    if (method === '新增') {
      vm.iscreatedate = false;
      if (userCommId === '') {
        vm.julacData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.julacData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }
    if (method === '修改' || method === '查看') {
      vm.julacData.time = new Date(julacData.time);
      if (userCommId === '') {
        vm.julacData.communityid = sqList[0].id;
        vm.userCommId = false;
      } else {
        vm.julacData.communityid = parseInt(userCommId, 0);
        vm.userCommId = true;
      }
    }

    //日期选择器
    $scope.today = function () {
      vm.julacData.time = new Date();
    };
    $scope.clear = function () {
      vm.julacData.time = null;
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
      if (vm.fileFile) {
        if (vm.fileFile.name.slice(-4) !== 'html') {
          $window.alert('请将word文件进行转换');
          return;
        }
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.julacForm');
        return;
      }
      if (vm.julacData.content === undefined || vm.julacData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.picFile) {
        vm.julacData.photos = vm.picFile;
      }
      if (vm.fileFile) {
        vm.julacData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.julacData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
