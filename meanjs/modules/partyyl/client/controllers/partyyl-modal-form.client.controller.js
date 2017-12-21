(function () {
  'use strict';

  angular
    .module('partyyl')
    .controller('PartyylModalFormController', PartyylModalFormController);

  PartyylModalFormController.$inject = ['$scope', '$uibModalInstance', 'partyylData', 'method', 'localStorageService', '$window'];
  function PartyylModalFormController($scope, $uibModalInstance, partyylData, method, localStorageService, $window) {
    /*var vm = this;
    vm.partyylData = partyylData;
    vm.method = method;
    vm.disabled = (method === 'view');

    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.partyylForm');
        return;
      }
      $uibModalInstance.close(vm.partyylData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }*/
    var mo = this;
    mo.partyylData = partyylData;
    mo.method = method;
    mo.disabled = (method === '查看');
    //活动类型 typeInfo
    var typeInfo = [
      {name: '亲商助企'},
      {name: '精准扶贫'},
      {name: '社会救助'},
      {name: '网格化管理'},
      {name: '文化生活'},
      {name: '平安建设'}
    ];
    $scope.typeInfo = typeInfo;
    //读取本地存储的社区常量表
    var cvsList = localStorageService.getItems('CommunityVillageConstant');
    $scope.communityInfo = cvsList;
    //日期选择器
    $scope.today = function () {
      mo.partyylData.starttime = new Date();
      mo.partyylData.endtime = new Date();
    };
    $scope.clear = function () {
      mo.partyylData.starttime = null;
      mo.partyylData.endtime = null;
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

    $scope.open2 = function () {
      $scope.popup2.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
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
    mo.ok = function (isValid) {
      if (mo.fileFile) {
        if (mo.fileFile.name.slice(-4) !== 'html') {
          $window.alert('请将word文件进行转换');
          return;
        }
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'mo.partyylForm');
        return;
      }
      if (mo.leixin === 3) {
        var h_start_y = mo.partyylData.starttime.getTime();
        var h_end_y = mo.partyylData.endtime.getTime();
        if (parseInt(h_start_y, 10) > parseInt(h_end_y, 10)) {
          mo.yzStartAndEndTime = true;
          return;
        } else {
          mo.yzStartAndEndTime = false;
        }
        if (mo.partyylData.content === undefined || mo.partyylData.content === '') {
          mo.yzContent = true;
          return;
        } else {
          mo.yzContent = false;
        }
      }
      if (mo.picFile) {
        mo.partyylData.photo = mo.picFile;
      }
      if (mo.fileFile) {
        mo.partyylData.file_path = mo.fileFile;
      }
      $uibModalInstance.close(mo.partyylData);
    };
    mo.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
