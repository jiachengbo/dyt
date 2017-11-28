(function () {
  'use strict';

  angular
    .module('commMemberTable')
    .controller('CommMemberTableModalFormController', CommMemberTableModalFormController);

  CommMemberTableModalFormController.$inject = ['$scope', '$uibModalInstance', 'commMemberTableData', 'method', 'columnDefs'];
  function CommMemberTableModalFormController($scope, $uibModalInstance, commMemberTableData, method, columnDefs) {
    var vm = this;
    vm.commMemberTableData = commMemberTableData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.commMemberTableForm');
        return;
      }
      if (vm.picFile) {
        vm.commMemberTableData.photo = vm.picFile;
      }
      $uibModalInstance.close(vm.commMemberTableData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
    //----------sex-----------
    var cvs_sex = [{'name': '男'}, {'name': '女'}];
    $scope.cvs_sex = cvs_sex;
    if (method === '新增') {
      vm.commMemberTableData.sex = cvs_sex[0].name;
    } else if (method === '修改') {
      vm.commMemberTableData.sex = commMemberTableData.sex;
    }
  }
}());
