(function () {
  'use strict';

  angular
    .module('advancedUnitManagement')
    .controller('AdvancedUnitManagementModalFormController', AdvancedUnitManagementModalFormController);

  AdvancedUnitManagementModalFormController.$inject = ['$scope', '$uibModalInstance', 'advancedUnitManagementData', 'method', 'columnDefs'];
  function AdvancedUnitManagementModalFormController($scope, $uibModalInstance, advancedUnitManagementData, method, columnDefs) {
    var vm = this;
    vm.advancedUnitManagementData = advancedUnitManagementData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.advancedUnitManagementForm');
        return;
      }
      $uibModalInstance.close(vm.advancedUnitManagementData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
    //日期选择器
    $scope.today = function () {
      vm.advancedUnitManagementData.first_declare = new Date(advancedUnitManagementData.first_declare);
      vm.advancedUnitManagementData.last_expired = new Date(advancedUnitManagementData.last_expired);
    };
    $scope.today();
    $scope.clear = function () {
      vm.advancedUnitManagementData.first_declare = null;
      vm.advancedUnitManagementData.last_expired = null;
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

    // end日期选择器
  }
}());
