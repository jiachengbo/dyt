(function () {
  'use strict';

  angular
    .module('basicinfo')
    .controller('TopVoiceinfoModalFormController', TopVoiceinfoModalFormController);

  TopVoiceinfoModalFormController.$inject = ['$scope', '$uibModalInstance', 'topvoiceData', 'method', 'typeid', '$window'];
  function TopVoiceinfoModalFormController($scope, $uibModalInstance, topvoiceData, method, typeid, $window) {
    var vm = this;
    vm.topvoiceData = topvoiceData;
    vm.topvoiceData.type = typeid;
    vm.method = method;
    vm.iscreatedate = true;
    vm.disabled = (method === '查看');
    if (method === '新增') {
      vm.iscreatedate = false;
    }
    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (vm.fileFile.name.slice(-4) !== 'html') {
        $window.alert('请将word文件进行转换');
        return;
      }
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.topvoiceForm');
        return;
      }
      if (vm.topvoiceData.content === undefined || vm.topvoiceData.content === '') {
        vm.yzContent = true;
        return;
      } else {
        vm.yzContent = false;
      }
      if (vm.picFile) {
        vm.topvoiceData.photos = vm.picFile;
      }
      if (vm.fileFile) {
        vm.topvoiceData.file_path = vm.fileFile;
      }
      $uibModalInstance.close(vm.topvoiceData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
