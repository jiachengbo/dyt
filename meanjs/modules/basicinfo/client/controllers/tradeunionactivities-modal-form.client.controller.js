(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('TradeUnionActivitiesinfoModalFormController', TradeUnionActivitiesinfoModalFormController);

  TradeUnionActivitiesinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'tradeunionactivitiesData', 'method'];
  function TradeUnionActivitiesinfoModalFormController($scope, $uibModalInstance, tradeunionactivitiesData, method) {
    var vm = this;
    vm.tradeunionactivitiesData = tradeunionactivitiesData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //是否推送首页下拉框
    var types = [
      {'typename': '工会资讯'},
      {'typename': '工会动态'}
    ];
    $scope.typeInfo = types;
    if (method === '新增') {
      vm.iscreatedate = false;
      vm.tradeunionactivitiesData.type = types[0].typename;
    }
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.tradeunionactivitiesForm');
        return;
      }
      if (vm.tradeunionactivitiesData.content === undefined || vm.tradeunionactivitiesData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.picFile) {
        vm.tradeunionactivitiesData.photos = vm.picFile;
      }
      if (vm.fileFile) {
        vm.tradeunionactivitiesData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.tradeunionactivitiesData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
