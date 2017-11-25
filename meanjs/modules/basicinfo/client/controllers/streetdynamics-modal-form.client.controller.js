(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('StreetDynamicsinfoModalFormController', StreetDynamicsinfoModalFormController);

  StreetDynamicsinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'streetdynamicsData', 'method'];
  function StreetDynamicsinfoModalFormController($scope, $uibModalInstance, streetdynamicsData, method) {
    var vm = this;
    vm.streetdynamicsData = streetdynamicsData;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    //是否推送首页下拉框
    var ispushs = [
      {'ispushname': '是'},
      {'ispushname': '否'}
    ];
    $scope.ispushInfo = ispushs;
    if (method === '新增') {
      vm.iscreatedate = false;
      vm.streetdynamicsData.ispush = ispushs[0].ispushname;
    }
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.streetdynamicsForm');
        return;
      }
      if (vm.streetdynamicsData.content === undefined || vm.streetdynamicsData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.picFile) {
        vm.streetdynamicsData.photos = vm.picFile;
      }
      if (vm.fileFile) {
        vm.streetdynamicsData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.streetdynamicsData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
