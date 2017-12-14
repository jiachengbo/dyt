(function () {
  'use strict';

  angular
    .module('womenInformationManagement')
    .controller('WomenInformationManagementModalFormController', WomenInformationManagementModalFormController);

  WomenInformationManagementModalFormController.$inject = ['$window', '$scope', '$uibModalInstance', 'womenInformationManagementData', 'method', 'columnDefs', 'localStorageService', 'Upload', '$log'];
  function WomenInformationManagementModalFormController($window, $scope, $uibModalInstance, womenInformationManagementData, method, columnDefs, localStorageService, Upload, $log) {
    var vm = this;
    vm.womenInformationManagementData = womenInformationManagementData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    if (method === '浏览') {
      vm.ifdown = false;
      if (!vm.womenInformationManagementData.file_path) {
        vm.disableddown = 1;
      }
    } else {
      vm.ifdown = false;
    }
    //判断是否存在图片
    if (vm.womenInformationManagementData.photo) {
      vm.showphoto = 1;
      vm.womenInformationManagementData.photo = womenInformationManagementData.photo;
    } else {
      vm.showphoto = 0;
    }
    //------------------------
//-----------------
    //下载文件
    vm.downFile = function () {
      $window.location = vm.womenInformationManagementData.file_path;
    };
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (vm.fileFile.name.slice(-4) !== 'html') {
        $window.alert('请将word文件进行转换');
        return;
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.womenInformationManagementForm');
        return;
      }
      if (vm.fileFile) {
        vm.womenInformationManagementData.file_path = vm.fileFile;
      }
      if (vm.photoFile) {
        vm.womenInformationManagementData.photo = vm.photoFile;
      }
      $uibModalInstance.close(vm.womenInformationManagementData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

//日期选择器
    $scope.today = function () {
      vm.womenInformationManagementData.time_update = new Date(womenInformationManagementData.time_update);
    };
    $scope.today();
    $scope.clear = function () {
      vm.womenInformationManagementData.time_update = null;
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

    // end日期选择器
    //读取本地存储的社区村常量表
    var cvsList = localStorageService.getItems('WomensFederationTypeTable');
    $scope.cvs = cvsList;
    if (method === '新增') {
      if (cvsList.length > 0) {
        vm.womenInformationManagementData.type = cvsList[0].id;
      } else {
        vm.womenInformationManagementData.type = '无';
      }
    } else if (method === '修改') {
      vm.womenInformationManagementData.type = womenInformationManagementData.type;
    }
  }
}());
