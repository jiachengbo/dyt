(function () {
  'use strict';

  angular
    .module('leagueOrganizationTable')
    .controller('LeagueOrganizationTableModalFormController', LeagueOrganizationTableModalFormController);

  LeagueOrganizationTableModalFormController.$inject = ['$scope', '$uibModalInstance', 'leagueOrganizationTableData', 'method', 'columnDefs'];
  function LeagueOrganizationTableModalFormController($scope, $uibModalInstance, leagueOrganizationTableData, method, columnDefs) {
    var vm = this;
    vm.leagueOrganizationTableData = leagueOrganizationTableData;
    vm.method = method;
    vm.disabled = (method === '浏览');
    vm.columnDefs = columnDefs;
    //在这里处理要进行的操作
    vm.ok = function(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.leagueOrganizationTableForm');
        return;
      }
      $uibModalInstance.close(vm.leagueOrganizationTableData);
    };
    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  }
}());
