(function () {
  'use strict';

  angular
    .module('organization')
    .controller('YLOModalFormController', YLOModalFormController);

  YLOModalFormController.$inject = ['$scope', '$uibModalInstance', 'yloData', 'method'];
  function YLOModalFormController($scope, $uibModalInstance, yloData, method) {
    var vm = this;
    vm.yloData = yloData;
    vm.method = method;
    vm.disabled = (method === '查看');
    //组织类别下拉框
    var types = [
      {'typename': '组织类别一'},
      {'typename': '组织类别二'},
      {'typename': '组织类别三'},
      {'typename': '组织类别四'},
      {'typename': '组织类别五'}
    ];
    $scope.typeInfo = types;
    //行业类别下拉框
    var industryTypes = [
      {'industryTypeName': '行业类别一'},
      {'industryTypeName': '行业类别二'},
      {'industryTypeName': '行业类别三'},
      {'industryTypeName': '行业类别四'},
      {'industryTypeName': '行业类别五'}
    ];
    $scope.industryTypeInfo = industryTypes;
    if (method === '新增') {
      vm.yloData.ylo_type = types[0].typename;
      vm.yloData.ylo_industrytype = industryTypes[0].industryTypeName;
    }

    //在这里处理要进行的操作
    vm.ok = function (isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.yloForm');
        return;
      }
      $uibModalInstance.close(vm.yloData);
    };
    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
